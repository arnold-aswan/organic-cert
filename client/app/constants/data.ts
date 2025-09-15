export type InspectionEntry = {
	id: string;
	farm: string;
	farmer: string;
	inspectionDate: string;
	inspector: string;
	complianceScore: number;
	status: "passed" | "failed" | "pending";
};

export type Farmer = {
	id: string;
	fullname: string;
	email: string;
	phone: string;
	county: string;
	status: "active" | "inactive";
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

export const farmers: Farmer[] = [
	{
		id: "1",
		fullname: "John Doe",
		email: "johndoe@example.com",
		phone: "+254712345678",
		county: "Nairobi",
		status: "active",
	},
	{
		id: "2",
		fullname: "Mary Wambui",
		email: "mary.wambui@example.com",
		phone: "+254711223344",
		county: "Kiambu",
		status: "inactive",
	},
	{
		id: "3",
		fullname: "Peter Otieno",
		email: "peter.otieno@example.com",
		phone: "+254733445566",
		county: "Kisumu",
		status: "active",
	},
	{
		id: "4",
		fullname: "Grace Njeri",
		email: "grace.njeri@example.com",
		phone: "+254701112233",
		county: "Mombasa",
		status: "active",
	},
];
