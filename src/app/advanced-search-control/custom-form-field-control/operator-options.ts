interface OperatorOption {
  id: string;
  defaultLabel: string;
  translationTerm: string;
  numberDomain: boolean;
  textDomain: boolean;
  shortLabel: string;
}

export class OperatorOptions {
  static options: OperatorOption[] = [
    {
      id: 'startswith',
      defaultLabel: 'Starts with',
      translationTerm: 'operator.startswith',
      numberDomain: false,
      textDomain: true,
      shortLabel: 'S',
    },
    {
      id: 'endswith',
      defaultLabel: 'Ends with',
      translationTerm: 'operator.endswith',
      numberDomain: false,
      textDomain: true,
      shortLabel: 'E',
    },
    {
      id: 'contains',
      defaultLabel: 'Contains',
      translationTerm: 'operator.contains',
      numberDomain: false,
      textDomain: true,
      shortLabel: 'C',
    },
    {
      id: 'eq',
      defaultLabel: 'Equals',
      translationTerm: 'operator.equals',
      numberDomain: true,
      textDomain: true,
      shortLabel: '=',
    },
    {
      id: 'gt',
      defaultLabel: 'Greater then',
      translationTerm: 'operator.greatherthen',
      numberDomain: true,
      textDomain: false,
      shortLabel: '>',
    },
    {
      id: 'lt',
      defaultLabel: 'Less then',
      translationTerm: 'operator.lessthen',
      numberDomain: true,
      textDomain: false,
      shortLabel: '<',
    },
    {
      id: 'gte',
      defaultLabel: 'Greater equal',
      translationTerm: 'operator.greaterequals',
      numberDomain: true,
      textDomain: false,
      shortLabel: '>=',
    },
    {
      id: 'lte',
      defaultLabel: 'Less equal',
      translationTerm: 'operator.lessequals',
      numberDomain: true,
      textDomain: false,
      shortLabel: '<=',
    },
    {
      id: 'neq',
      defaultLabel: 'Not equal',
      translationTerm: 'operator.notequal',
      numberDomain: true,
      textDomain: false,
      shortLabel: '!=',
    },
  ];

  static get numberOptions(): OperatorOption[] {
    return [...OperatorOptions.options].filter((option) => option.numberDomain);
  }

  static get textOptions(): OperatorOption[] {
    return [...OperatorOptions.options].filter((option) => option.textDomain);
  }
}
