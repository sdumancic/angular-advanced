import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatInput } from '@angular/material/input';
import {
  TreeComponent,
  TreeModel,
  TreeNode,
  TREE_ACTIONS,
} from '@circlon/angular-tree-component';
import { take } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { MappingOverlayComponent } from '../mapping-component/mapping-overlay.component';
import { nodeTypes, nodes } from './data';

function copyObjectAndUpdateId(aObject) {
  if (!aObject) {
    return aObject;
  }

  let v;
  let bObject = Array.isArray(aObject) ? [] : {};
  for (const k in aObject) {
    v = aObject[k];
    if (k === 'id') {
      v = uuidv4();
    }
    if (k === '_dragAction') {
      v = 'move';
    }

    bObject[k] = typeof v === 'object' ? copyObjectAndUpdateId(v) : v;
  }

  return bObject;
}

@Component({
  selector: 'app-tree-drag-drop-home',
  templateUrl: './tree-drag-drop-home.component.html',
  styleUrls: ['./tree-drag-drop-home.component.scss'],
})
export class TreeDragDropHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('targetTree') targetTree: TreeComponent;
  @ViewChild('filter', { static: true }) filterElementRef: ElementRef;

  nodeTypes = nodeTypes;
  generatedMappingJson: string;

  nodes: any[];
  nodes2: any[];

  optionsSource = {
    allowDrag: true,
    allowDrop: true,
  };
  optionsTarget = {
    allowDrag: true,
    allowDrop: (element, { parent, index }) => {
      return true;
    },
    actionMapping: {
      mouse: {
        drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }) => {
          // use from to get the dragged node.
          // use to.parent and to.index to get the drop location
          // use TREE_ACTIONS.MOVE_NODE to invoke the original action

          if (from.data._dragAction === 'clone') {
            const fromDataCopy = copyObjectAndUpdateId(from.data);
            if (!to.parent.data.children) {
              to.parent.data.children = [];
            }
            to.parent.data.children.splice(to.index, 0, fromDataCopy);
          } else if (from.data._dragAction === 'move') {
            TREE_ACTIONS.MOVE_NODE(tree, node, $event, { from, to });
          }

          this.targetTree.treeModel.update();

          this.generateMapping();
        },
      },
    },
  };

  constructor(private overlay: Overlay) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.nodes2 = [];
    this.nodes = nodes;
    nodes.forEach((node) => {
      const newNode = copyObjectAndUpdateId(node);
      this.nodes2.push(newNode);
    });
    this.generateMapping();
  }

  onUpdateData(event) {}

  addNode() {
    this.targetTree.treeModel.setFocus(true);
    const activeNode = this.targetTree.treeModel.getActiveNode();
    if (!activeNode) {
      this.nodes2.push({
        id: uuidv4(),
        name: 'a new child',
        type: 'string',
        _dragAction: 'move',
      });
      this.targetTree.treeModel.update();
      return;
    }
    if (activeNode.data.children === undefined) {
      activeNode.data.children = new Array();
    }
    console.log(activeNode.data.children);
    activeNode.data.children.push({
      id: uuidv4(),
      name: 'a new child',
      _dragAction: 'move',
      type: 'string',
      hasChildren: false,
    });
    console.log(activeNode.data.children);

    this.targetTree.treeModel.update();
    if (activeNode.isCollapsed) {
      this.targetTree.treeModel.getActiveNode().toggleExpanded();
    }

    this.generateMapping();
  }

  addChildNode(parent: TreeNode) {
    this.targetTree.treeModel.setFocus(true);
    if (parent.data.children === undefined) {
      parent.data.children = new Array();
    }
    parent.data.children.push({
      id: uuidv4(),
      name: 'a new child',
      type: 'string',
      _dragAction: 'move',
      hasChildren: false,
    });
    this.targetTree.treeModel.update();
    if (parent.isCollapsed) {
      console.log('parent is collapsed');
      parent.toggleExpanded();
      this.targetTree.treeModel.getNodeById(parent.data.id).toggleExpanded();
    }

    this.generateMapping();
  }

  deleteNode(nodeToDelete) {
    if (nodeToDelete.level === 1) {
      this.nodes2 = this.nodes2.filter((n) => n.id !== nodeToDelete.data.id);
    } else {
      console.log(nodeToDelete.parent.data.children);
      nodeToDelete.parent.data.children =
        nodeToDelete.parent.data.children.filter(
          (n) => n.id !== nodeToDelete.data.id
        );
    }
    this.targetTree.treeModel.update();
    this.generateMapping();
  }

  generateMapping() {
    const results = [];
    for (let ind in this.nodes2) {
      const rec = this.nodes2[ind];
      const mapping = this.generateMappingForElement(
        rec.id,
        rec.key,
        rec.name,
        results
      );
      //result.push(mapping);
    }

    this.generatedMappingJson = results.join('\r\n');
  }

  generateMappingForElement(
    id: string,
    key: string,
    name: string,
    results: string[]
  ) {
    const node = this.targetTree?.treeModel?.getNodeById(id);
    //console.log('generateMappingForElement ', id, key, node?.hasChildren);
    let result;
    if (node?.hasChildren) {
      result = name + ' : {';
      results.push(result);
      for (let ind2 in node.data.children) {
        const childNode = node.data.children[ind2];
        this.generateMappingForElement(
          childNode.id,
          childNode.key,
          childNode.name,
          results
        );
      }

      results.push('}');
    } else {
      results.push(name + ' : ' + key);
    }
  }

  emptyTree() {
    this.nodes2 = [];
    this.targetTree.treeModel.update();
    this.generateMapping();
  }

  clearFilter() {
    this.targetTree.treeModel.clearFilter();
    this.filterElementRef.nativeElement.value = '';
  }

  generateJson() {
    const results = ['{'];
    const firstLevelElementsCount = this.nodes2.length;
    let firstLevelCounter = 0;
    for (let ind in this.nodes2) {
      const rec = this.nodes2[ind];
      firstLevelCounter++;
      const attribute = this.generateAttributeForElement(
        rec.id,
        rec.type,
        rec.name,
        results,
        firstLevelCounter === firstLevelElementsCount
      );
    }
    results.push('}');
    console.log(results.join('\r\n'));
  }

  generateAttributeForElement(
    id: string,
    type: string,
    name: string,
    results: string[],
    lastElementInList: boolean
  ) {
    const node = this.targetTree?.treeModel?.getNodeById(id);
    let result;
    if (node?.hasChildren) {
      result = '"' + name + '"' + ' : {';
      results.push(result);
      let counter = 0;
      for (let ind2 in node.data.children) {
        const childrenCount = node.data.children.length;
        const childNode = node.data.children[ind2];
        counter++;
        this.generateAttributeForElement(
          childNode.id,
          childNode.type,
          childNode.name,
          results,
          counter === childrenCount
        );
      }
      lastElementInList ? results.push('}') : results.push('},');
    } else {
      const val = lastElementInList
        ? '"' + name + '"' + ' : ' + '"' + type + '"'
        : '"' + name + '"' + ' : ' + '"' + type + '"' + ',';
      results.push(val);
    }
  }

  editMapping(node: TreeNode, event) {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      height: '100px',
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'mat-elevation-z8',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(event.path[0])
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
    });
    const component = new ComponentPortal(MappingOverlayComponent);

    const componentRef = overlayRef.attach(component);
    componentRef.instance.value = node.data.name;
    componentRef.instance.valueChanged.pipe(take(1)).subscribe((val) => {
      node.data.name = val;
      overlayRef.detach();
    });
    componentRef.instance.close
      .pipe(take(1))
      .subscribe(() => overlayRef.detach());

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
