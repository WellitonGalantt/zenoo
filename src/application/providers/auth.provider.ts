export interface AuthProvider {
    gerenate(userId:number, role:string): string;
    validate(token: string): string;
}