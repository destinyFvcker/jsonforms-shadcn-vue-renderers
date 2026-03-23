import { and, schemaTypeIs, uiTypeIs } from "@jsonforms/core";

/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type null
 * @type {Tester}
 */
export const isNullControl = and(uiTypeIs("Control"), schemaTypeIs("null"));
