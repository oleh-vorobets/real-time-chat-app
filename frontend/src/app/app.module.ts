import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './components/chat/chat.component';
import { NavbarComponent } from './components/chat/navbar/navbar.component';
import { MenuComponent } from './components/chat/menu/menu.component';
import { MainContentComponent } from './components/chat/main-content/main-content.component';
import { ChatItemComponent } from './components/chat/main-content/chat-item/chat-item.component';
import { SocketService } from './services/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth.guard';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { UserService } from './services/user.service';
import { NewChatroomComponent } from './components/chat/new-chatroom/new-chatroom.component';
import { MessageComponent } from './components/chat/main-content/message/message.component';
import { RoomItemComponent } from './components/chat/main-content/room-item/room-item.component';
import { AddMemberComponent } from './components/chat/add-member/add-member.component';

const config: SocketIoConfig = { url: 'http://localhost:80', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    NavbarComponent,
    MenuComponent,
    MainContentComponent,
    ChatItemComponent,
    NewChatroomComponent,
    MessageComponent,
    RoomItemComponent,
    AddMemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    FormsModule,
  ],
  providers: [
    AuthService,
    SocketService,
    CookieService,
    AuthGuard,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
