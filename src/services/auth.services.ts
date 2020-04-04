/* eslint-disable max-len */
import { SecurePass } from 'argon2-pass';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserInterface, UserInputDTOInterface } from '../interfaces/User';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../models');

const { User } = db;

/**
 * Helper to construct a token
 * @param user
 */
const generateToken = (user: UserInterface) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  // JSON Web Token
  return jwt.sign(
    {
      id: user.id, // Use in the middleware 'isAuth'
      exp: exp.getTime() / 1000
    },
    config.jwtSecret
  );
};

/**
 * Remove certain props from the object
 * @param user
 */
const filterUserObject = (user: UserInterface) => {
  Reflect.deleteProperty(user, 'password');
  Reflect.deleteProperty(user, 'createdAt');
  Reflect.deleteProperty(user, 'updatedAt');

  return user;
};

/**
 * Sign Up method
 * @param userInputDTO
 */
export const signUpService = async (
  userInputDTO: UserInputDTOInterface
): Promise<{ user: UserInterface; token: string }> => {
  // Create a new instance of SecurePass. Optional difficulty configurations can be passed in here.
  const sp = new SecurePass();

  // Passwords and Hashes are stored as buffers internally.
  const password = Buffer.from(userInputDTO.password);
  const hashedPassword = await sp.hashPassword(password);

  // Create user
  const record = await User.findOrCreate({
    where: { email: userInputDTO.email },
    defaults: {
      ...userInputDTO,
      password: hashedPassword
    }
  });

  // In case ite already exists
  if (!record[1]) throw new Error('Your email is already registered.');

  return {
    user: filterUserObject(record[0].dataValues),
    token: generateToken(record[0]) // Generate JWT
  };
};

/**
 * Sign In method
 * @param userInputDTO
 */
export const signInService = async (
  email: string,
  password: string
): Promise<{ user: UserInterface; token: string }> => {
  const record = await User.findOne({ email });

  if (!record) {
    throw new Error('User not registered');
  }

  // Verify password
  const sp = new SecurePass();
  const passwordBuffer = Buffer.from(password);
  const verificationResult = await sp.verifyHash(
    passwordBuffer,
    record.password
  );

  if (SecurePass.isValid(verificationResult)) {
    const token = generateToken(record);

    return {
      user: filterUserObject(record.dataValues),
      token
    };
  }

  throw new Error('Invalid Password');
};

export default {};
