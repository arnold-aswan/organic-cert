import express from "express";
import { validate } from "../middlewares/validate";
import {
	addField,
	deleteField,
	getFields,
	updateField,
} from "../controllers/field.controller";
import {
	deleteFieldSchema,
	fieldSchema,
	getFieldsSchema,
	updateFieldSchema,
} from "../libs/validate-schema";

const router = express.Router();

router.post("/create", validate(fieldSchema), addField);
router.put("/:fieldId", validate(updateFieldSchema), updateField);
router.delete("/:fieldId", validate(deleteFieldSchema), deleteField);
router.get("/", validate(getFieldsSchema), getFields);

export default router;
