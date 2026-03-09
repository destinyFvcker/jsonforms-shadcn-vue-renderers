import { entry as StringControlRendererEntry } from "./StringControlRenderer.entry";
import { entry as BooleanControlRendererEntry } from "./BooleanControlRenderer.entry";
import { entry as MultiStringControlRendererEntry } from "./MultiStringControlRenderer.entry";
import { entry as BooleanToggleControlRendererEntry } from "./BooleanToggleControlRenderer.entry";
import { entry as DateControlRendererEntry } from "./DateControlRenderer.entry";
import { entry as DateTimeControlRendererEntry } from "./DateTimeControlRenderer.entry";
import { entry as OneOfEnumControlRendererEntry } from "./OneOfEnumControlRenderer.entry";
import { entry as EnumControlRendererEntry } from "./EnumControlRenderer.entry";
import { entry as NumberControlRendererEntry } from "./NumberControlRenderer.entry";
import { entry as IntegerControlRendererEntry } from "./IntegerControlRenderer.entry";

export const shadcnControlRenderers = [
	MultiStringControlRendererEntry,
	StringControlRendererEntry,
	NumberControlRendererEntry,
	IntegerControlRendererEntry,
	BooleanToggleControlRendererEntry,
	BooleanControlRendererEntry,
	DateControlRendererEntry,
	DateTimeControlRendererEntry,
	EnumControlRendererEntry,
	OneOfEnumControlRendererEntry,
];
