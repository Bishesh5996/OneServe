import { LoginUserUseCase } from "../../application/use-cases/login-user.use-case.js";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.use-case.js";

const registerUseCase = new RegisterUserUseCase();
const loginUseCase = new LoginUserUseCase();

export class AuthController {
  static async register(req, res) {
    try {
      const result = await registerUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const result = await loginUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}
