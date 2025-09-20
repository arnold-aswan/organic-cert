export type InspectionEntry = {
	id: string;
	farm: string;
	farmer: string;
	inspectionDate: string;
	inspector: string;
	complianceScore: number;
	status: "passed" | "failed" | "pending";
};

type TableHeads = {
	value: string;
};

export const inspectionData: InspectionEntry[] = [
	{
		id: "1",
		farm: "Green Valley",
		farmer: "John Doe",
		inspectionDate: "2025-09-01",
		inspector: "Alice Smith",
		complianceScore: 85,
		status: "passed",
	},
	{
		id: "2",
		farm: "Riverbend Farm",
		farmer: "Mary Johnson",
		inspectionDate: "2025-09-03",
		inspector: "David Lee",
		complianceScore: 72,
		status: "pending",
	},
	{
		id: "3",
		farm: "Sunrise Acres",
		farmer: "James Brown",
		inspectionDate: "2025-09-05",
		inspector: "Sophia White",
		complianceScore: 60,
		status: "failed",
	},
	{
		id: "4",
		farm: "Hillside Farm",
		farmer: "Emma Wilson",
		inspectionDate: "2025-09-07",
		inspector: "Chris Taylor",
		complianceScore: 95,
		status: "passed",
	},
	{
		id: "5",
		farm: "Oakwood Estate",
		farmer: "Michael Clark",
		inspectionDate: "2025-09-08",
		inspector: "Laura Adams",
		complianceScore: 50,
		status: "failed",
	},
	{
		id: "6",
		farm: "Willow Creek",
		farmer: "Olivia Harris",
		inspectionDate: "2025-09-10",
		inspector: "Daniel Carter",
		complianceScore: 88,
		status: "passed",
	},
	{
		id: "7",
		farm: "Cedar Grove",
		farmer: "Ethan Martinez",
		inspectionDate: "2025-09-11",
		inspector: "Grace Lewis",
		complianceScore: 77,
		status: "pending",
	},
];

export const farmersTableHeads: TableHeads[] = [
	{
		value: "full name",
	},
	{
		value: "email",
	},
	{
		value: "phone",
	},
	{
		value: "county",
	},
	{
		value: "farms",
	},
	{
		value: "status",
	},
	{
		value: "actions",
	},
];

export const agronomistsTableHeads: TableHeads[] = [
	{
		value: "full name",
	},
	{
		value: "email",
	},
	{
		value: "phone",
	},
	{
		value: "county",
	},
	{
		value: "status",
	},
	{
		value: "actions",
	},
];

export const farmsTableHeads: TableHeads[] = [
	{
		value: "farm name",
	},
	{
		value: "farmer",
	},
	{
		value: "location",
	},
	{
		value: "area(Ha)",
	},
	{
		value: "fields",
	},
	{
		value: "status",
	},
	{
		value: "actions",
	},
];

export const fieldsTableHeads: TableHeads[] = [
	{
		value: "field name",
	},
	{
		value: "farm",
	},
	{
		value: "crop",
	},
	{
		value: "area(Ha)",
	},
	{
		value: "status",
	},
	{
		value: "actions",
	},
];

export const inspectionsTableHeads: TableHeads[] = [
	{
		value: "farm ",
	},
	// {
	// 	value: "farmer",
	// },
	{
		value: "inspection date",
	},
	{
		value: "inspector",
	},
	{
		value: "compliance score",
	},
	{
		value: "status",
	},
	{
		value: "actions",
	},
];

export const certificatesTableHeads: TableHeads[] = [
	{
		value: "certificateNo ",
	},
	{
		value: "farm name",
	},
	{
		value: "farmer",
	},
	{
		value: "issue date",
	},
	{
		value: "expiry date",
	},
	{
		value: "compliance score",
	},
	{
		value: "status",
	},
	{
		value: "actions",
	},
];
