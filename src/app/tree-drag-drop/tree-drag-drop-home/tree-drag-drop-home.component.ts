import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  TreeComponent,
  TreeModel,
  TreeNode,
  TREE_ACTIONS,
} from '@circlon/angular-tree-component';
import { v4 as uuidv4 } from 'uuid';

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
    if (k === '_dragActionClone') {
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
  generatedMappingJson: string;
  nodeTypes = [
    { value: 'object', viewValue: 'Object' },
    { value: 'technical-attributes', viewValue: 'Technical Attributes' },
  ];
  nodes2: any[];
  nodes = [
    {
      id: 'orders.id',
      key: 'orders.id',
      name: 'id',
      _dragAction: 'clone',
    },
    {
      id: 'orders.orderDate',
      key: 'orders.orderDate',
      name: 'orderDate',
      _dragAction: 'clone',
    },
    {
      id: 'orders.processDate',
      key: 'orders.processDate',
      name: 'processDate',
      _dragAction: 'clone',
    },
    {
      id: 'orders.orderStatus',
      key: 'orders.orderStatus',
      name: 'orderStatus',
      _dragAction: 'clone',
      children: [
        {
          id: 'orders.orderStatus.code',
          key: 'orders.orderStatus.code',
          name: 'code',
          _dragAction: 'clone',
        },
        {
          id: 'orders.orderStatus.value',
          key: 'orders.orderStatus.value',
          name: 'value',
          _dragAction: 'clone',
        },
      ],
    },
    {
      id: 'orders.customer',
      key: 'orders.customer',
      name: 'customer',
      _dragAction: 'clone',
      children: [
        {
          id: 'orders.customer.id',
          key: 'orders.customer.id',
          name: 'id',
          _dragAction: 'clone',
        },
        {
          id: 'orders.customer.name',
          key: 'orders.customer.name',
          name: 'name',
          _dragAction: 'clone',
        },
        {
          id: 'orders.customer.address',
          key: 'orders.customer.address',
          name: 'address',
          _dragAction: 'clone',
        },
        {
          id: 'orders.customer.city',
          key: 'orders.customer.city',
          name: 'city',
          _dragAction: 'clone',
        },
        {
          id: 'orders.customer.phones',
          key: 'orders.customer.phones',
          name: 'phones',
          _dragAction: 'clone',
          children: [
            {
              id: 'orders.customer.phones.value',
              key: 'orders.customer.phones.value',
              name: 'value',
              _dragAction: 'clone',
            },
          ],
        },
      ],
    },
    {
      id: 'orders.items',
      key: 'orders.items',
      name: 'items',
      _dragAction: 'clone',
      children: [
        {
          id: 'orders.items.id',
          key: 'orders.items.id',
          name: 'id',
          _dragAction: 'clone',
        },
        {
          id: 'orders.items.price',
          key: 'orders.items.price',
          name: 'price',
          _dragAction: 'clone',
        },
        {
          id: 'orders.items.name',
          key: 'orders.items.name',
          name: 'name',
          _dragAction: 'clone',
        },
      ],
    },
    {
      id: 'orders.orderTotal',
      key: 'orders.orderTotal',
      name: 'orderTotal',
      _dragAction: 'clone',
    },
  ];
  optionsSource = {
    allowDrag: true,
    allowDrop: true,

    getNodeClone: (node) => ({
      ...node.data,
      id: uuidv4(),
      name: `copy of ${node.data.name}`,
    }),
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

  constructor() {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.nodes2 = [];
    this.nodes.forEach((node) => {
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
        _dragAction: 'move',
      });
      this.targetTree.treeModel.update();
      return;
    }
    if (activeNode.data.children === undefined) {
      activeNode.data.children = new Array();
    }
    activeNode.data.children.push({
      id: uuidv4(),
      name: 'a new child',
      _dragAction: 'move',
      hasChildren: false,
    });
    this.targetTree.treeModel.update();
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
}
