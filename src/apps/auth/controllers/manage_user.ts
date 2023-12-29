import { Response } from "express";
import { User } from "../services/dbServices.js";
import { ExtendedRequest } from "../../../shared/types.js";

export async function get_user(req: ExtendedRequest, res: Response) {
  const user_id = parseInt(req.params.id);

  const user = await User.get_user_by_id(user_id);
  if (!user) {
    return res.status(404).send("User does not exists");
  }

  if (req.user && req.user.user_id != user.id) {
    return res.status(404).send("Invalid Credentials");
  }

  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    country_code: user.country_code,
    phone_number: user.phone_number,
    email_verified: user.email_verified,
  });
}

export async function update_user(req: ExtendedRequest, res: Response) {
  const user_id = parseInt(req.params.id);

  if (req.user && req.user.user_id != user_id) {
    return res.status(404).send("Invalid Credentials");
  }

  const fields = req.body;
  fields["updated_at"] = new Date();

  await User.update_user(fields, user_id);
  return res.status(201).send("Fields updated succesfully");
}

export async function deactivate_user(req: ExtendedRequest, res: Response) {
  const user_id = parseInt(req.params.id);

  if (req.user && req.user.user_id != user_id) {
    return res.status(404).send("Invalid Credentials");
  }

  await User.deactivate_user(user_id);
  return res.status(201).send("Account Deactivated Sucessfully!");
}

export async function delete_user(req: ExtendedRequest, res: Response) {
  const user_id = parseInt(req.params.id);

  if (req.user && req.user.user_id != user_id) {
    return res.status(404).send("Invalid Credentials");
  }

  await User.delete_user(user_id);
  return res.status(201).send("Deletion succesfull");
}

// TODO: unarchive function
