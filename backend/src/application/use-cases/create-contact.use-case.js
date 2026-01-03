import { ContactRepository } from "../../infrastructure/repositories/contact.repository.js";

export class CreateContactUseCase {
  constructor(contacts = new ContactRepository()) {
    this.contacts = contacts;
  }

  async execute(payload = {}) {
    if (!payload.name) throw new Error("Name is required");
    if (!payload.email) throw new Error("Email is required");
    if (!payload.message) throw new Error("Message is required");
    return this.contacts.create(payload);
  }
}
