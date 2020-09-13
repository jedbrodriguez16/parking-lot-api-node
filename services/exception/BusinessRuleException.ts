export default class BusinessRuleException extends Error {
  constructor(message: string) {
    super(message);
  }
}
