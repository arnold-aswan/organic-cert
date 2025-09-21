import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/dashboard/dashboard-layout.tsx", [
		index("routes/dashboard/index.tsx"),
		route("farmers", "routes/dashboard/farmers/index.tsx"),
		route("farms", "routes/dashboard/farms/index.tsx"),
		route("fields", "routes/dashboard/fields/index.tsx"),
		route("inspections", "routes/dashboard/inspections/index.tsx"),
		route("certificates", "routes/dashboard/certifications/index.tsx"),
		route("agronomists", "routes/dashboard/agronomists/index.tsx"),
	]),
] satisfies RouteConfig;
