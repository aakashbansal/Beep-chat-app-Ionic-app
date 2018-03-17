import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { Channel } from "../../models/channel/channel.interface";
import { ChannelMessage } from "../../models/channel/channel-message.interface";
import { Message } from "../../models/message/message.interface";
import { AuthService } from "../auth-service/auth-service";

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';

@Injectable()
export class ChatService {

    constructor(private database: AngularFireDatabase,
        private auth: AuthService) {

    }

    createNewChannel(channelName: string) {
        this.database.list('channels-name/')
            .push({ name: channelName });
    }

    getChannelListRef(): AngularFireList<Channel> {
        return this.database.list<Channel>('channels-name/');
    }

    getChannelChatRef(channelKey: string): Observable<ChannelMessage[]> {
        return this.database.list<ChannelMessage>(`channels/${channelKey}`).valueChanges();
    }

    sendMessageToChannel(channelKey: string, message: ChannelMessage) {
        return this.database.list(`/channels/${channelKey}`).push(message);
    }

    sendChatMessage(message: Message) {
        this.database.list('/messages/').push(message);
    }

    getChats(receiverId: string): Observable<Message[]> {
        return this.auth.getAuthenticatedUser()
            .map(user => user.uid)
            .mergeMap(uid => this.database.list(`user-messages/${uid}/${receiverId}`)
                .snapshotChanges())
            .mergeMap(chats =>
                Observable.forkJoin(
                    chats.map(chat =>
                        this.database.object<Message>(`/messages/${chat.key}`).valueChanges().first()),
                    (...vals) => {
                        return vals;
                    }
                )
            )
    }
 

    getLastMessages(): Observable<Message[]> {
        return this.auth.getAuthenticatedUser()
            .map(user => user.uid)
            .mergeMap(userId => this.database.list(`last-messages/${userId}`)
                .snapshotChanges())
            .mergeMap(lastMessages =>
                Observable.forkJoin(
                    lastMessages.map(eachMessage =>
                       this.database.object<Message>(`/messages/${eachMessage.payload.val().key}`).valueChanges().first()),
                    (...vals) => {
                        return vals;
                    })
            )
    }
}