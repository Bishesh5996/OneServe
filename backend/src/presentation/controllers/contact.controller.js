import { CreateContactUseCase } from "../../application/use-cases/create-contact.use-case.js";

const createUseCase = new CreateContactUseCase();

export class ContactController {
  static async create(req, res) {
    try {
      const submission = await createUseCase.execute(req.body);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
