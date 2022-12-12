export class BusinessRole {
    private static readonly ROLE_HIERARCHY: string[] = ["viewer", "support", "admin"];

    private readonly roleIndex: number

    constructor(roleName: string) {
        this.roleIndex = BusinessRole.ROLE_HIERARCHY.indexOf(roleName)
    }

    haveSamePrivilegeLevel(role: BusinessRole) {
        return this.roleIndex >= role.roleIndex
    }
}

export class Privilege {
    constructor(private readonly business: string, private readonly role: BusinessRole) { }

    hasAccess(privilege: Privilege): boolean {
        if (this.business !== privilege.business) return false;
        return this.role.haveSamePrivilegeLevel(privilege.role)
    }
}

export default class Requester {
    constructor(private readonly privileges: Privilege[]) { }

    hasAccess(privilege: Privilege): boolean {
        return this.privileges.find(p => p.hasAccess(privilege)) !== undefined
    }
}