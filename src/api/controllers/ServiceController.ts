import Service from "@app/service/Service";

export default class ServiceController {
  constructor(private readonly service: Service) {}

  //   async users(req: Request, res: Response): Promise<void> {
  //     const rootBusiness = req.params.businessId;
  //     const users = await this.userService.getBusinessUsers(rootBusiness);

  //     const response = users
  //       .map(({ id, email, businesses }) => {
  //         const business = businesses.find((business) => business.id === rootBusiness);
  //         if (business === undefined) return undefined;

  //         return {
  //           id,
  //           email,
  //           role: business.role,
  //           roleTimestamp: business.createdAt
  //         };
  //       })
  //       .filter((r) => r !== undefined);

  //     res.json(response);
  //   }
  //   async inviteUser(req: Request, res: Response): Promise<void> {
  //     const rootBusiness = req.params.businessId;
  //     const { email, role } = req.body;

  //     if (email === undefined || email.length === 0) throw new MissingParameterError("email");
  //     if (role === undefined || role.length === 0) throw new MissingParameterError("role");

  //     await this.userService.inviteUser(email, rootBusiness, role);
  //     res.sendStatus(204);
  //   }
}
