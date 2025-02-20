import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private users = new Map();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.users.set(userId, client.id);
      client.join(userId); // Join room with user ID
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.users.entries()].find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, socketId]) => socketId === client.id
    )?.[0];

    if (userId) {
      this.users.delete(userId);
    }
  }
}
