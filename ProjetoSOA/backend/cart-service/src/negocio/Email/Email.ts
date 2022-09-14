class Email {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public validar(): boolean {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(this.email);
  }
}

export default Email;
