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

/**
 * A Field type
 * @typedef {object} Field
 * @property {string} name.required - Field name
 * @property {string} farmId.required - Linked Farm ID (ObjectId)
 * @property {number} area.required - Field size in hectares
 * @property {array<string>} crop - List of crops in the field
 * @property {string} status - Field status (planted, growing, harvested, fallow)
 * @enum {string} status.planted
 * @enum {string} status.growing
 * @enum {string} status.harvested
 * @enum {string} status.fallow
 */

/**
 * POST /fields/create
 * @summary Create a new field
 * @tags Fields
 * @param {Field} request.body.required - Field info
 * @return {Field} 201 - Created field
 */
router.post("/create", validate(fieldSchema), addField);

/**
 * PUT /fields/{fieldId}
 * @summary Update a field
 * @tags Fields
 * @param {string} fieldId.path.required - Field ID
 * @param {Field} request.body.required - Updated field data
 * @return {Field} 200 - Updated field
 */
router.put("/:fieldId", validate(updateFieldSchema), updateField);

/**
 * DELETE /fields/{fieldId}
 * @summary Delete a field
 * @tags Fields
 * @param {string} fieldId.path.required - Field ID
 * @return {object} 200 - Success message
 */
router.delete("/:fieldId", validate(deleteFieldSchema), deleteField);

/**
 * GET /fields
 * @summary Get all fields
 * @tags Fields
 * @return {array<Field>} 200 - List of fields
 */
router.get("/", validate(getFieldsSchema), getFields);

export default router;
