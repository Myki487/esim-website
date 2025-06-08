import { StaticUser } from "@/types/StaticUser";

const staticUsers: StaticUser[] = [
	{
		username: 'Admin777',
		email: 'myusername1928@gmail.com',
		password: '03058425',
	},
	{
		username: 'VavyLone',
		email: 'mr.k.g.487@gmail.com',
		password: 'VavyLone487',
	},
];

export function authenticate(email: string, password: string): StaticUser | null {
	return staticUsers.find(
		(user) => user.email === email && user.password === password
	) || null;
}
