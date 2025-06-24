export class MetadataCoverageMetric {
  requiredFields: string[];
  presentFields: string[];
  coverageRate: number;

  constructor(requiredFields: string[], presentFields: string[]) {
    this.requiredFields = requiredFields;
    this.presentFields = presentFields;
    this.coverageRate = this.calculateCoverageRate();
  }

  private calculateCoverageRate(): number {
    if (this.requiredFields.length === 0) return 1.0;

    const matched = this.requiredFields.filter(field => this.presentFields.includes(field));
    return parseFloat((matched.length / this.requiredFields.length).toFixed(2));
  }

  public toJSON(): Record<string, any> {
    return {
      requiredFields: this.requiredFields,
      presentFields: this.presentFields,
      coverageRate: this.coverageRate,
    };
  }
}
