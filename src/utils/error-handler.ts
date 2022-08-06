export default class ErrorHandler extends Error {
  constructor(public statusCodes: number, public message: string) {
    super(message);
  }
}
