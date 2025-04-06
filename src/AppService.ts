// Classe para interagir com Cognito
export class CognitoService {
  // private client: CognitoIdentityProviderClient
  // private userPoolId: string
  // private clientId: string

  constructor() {
    // this.client = new CognitoIdentityProviderClient({ region })
    // this.userPoolId = userPoolId
    // this.clientId = clientId
  }

  // Método para login de usuário
  async CheckHealth() {
    return { status: 'up' }
  }

  // Método para login de usuário
  async Message(name: string) {
    try {
      const data = name
      return { name: data }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }

  // Método para criar um usuário
  async createUser(name: string, email: string) {
    const params: AdminCreateUserCommandInput = {
      UserPoolId: this.userPoolId,
      Username: username,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' }
      ]
    }

    const command = new AdminCreateUserCommand(params)

    try {
      const data = name
      return data
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error)
    }
  }
}
