import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisAdapter } from 'socket.io-redis';

@WebSocketGateway({
  // cors: {
  //   origin: 'http://localhost:5000',
  //   methods: ['GET', 'POST'],
  // },
  transports: ['websocket'],
  namespace: '/kekw',
})
export class EventsGateway {
  private readonly logger = new Logger(EventsGateway.name);
  constructor() {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('zalupa')
  async findAll(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    await socket.join('govno');
    console.debug('zalupa', socket.rooms, data);
    // return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@ConnectedSocket() socket: Socket, @MessageBody() data: number): Promise<number> {
    await socket.join('govno');
    console.debug('govno', socket.rooms, data);
    return data;
  }
  handleConnection(client: Socket): any {
    this.logger.debug('new user connected...');
    client.emit('connection', 'Succesfuly connected');
    const ad = this.server.adapter as unknown as RedisAdapter;
    console.debug(ad.rooms);
  }
}
