import { AfterViewChecked, Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SenderTypeEnum } from '../../enums/sender-type.enum';
import { AssistantChatData } from '../../../Models/data/assistant-chat-data';
import { ASSISTANT_CONSTS } from '../../constants/assistant-consts';
import { AssistantService } from '../../../services/assistant.service';
import { AssistantRequest } from '../../../Models/Requests/assistant.request';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponseData } from '../../../Models/Responses/response-data';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-assistant',
  standalone: false,
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.scss'
})
export class AssistantComponent implements OnInit, AfterViewChecked {
  showChatWindow: boolean = false;
  senderTypeEnum = SenderTypeEnum;
  userInput: string = "";
  isAssistantTyping: boolean = false;
  
  chatBubbles: AssistantChatData[] = [];

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor (
    private assistantService: AssistantService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.chatBubbles.push(new AssistantChatData(ASSISTANT_CONSTS.INTRODUCTION, SenderTypeEnum.Assistant));
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessageToAssistant() {
    this.isAssistantTyping = true;
    const userInputCopy = this.userInput;

    if (userInputCopy.trim().length !== 0) {
      //Create user message as bubble
      const userMessage: AssistantChatData = new AssistantChatData(userInputCopy, SenderTypeEnum.User);
      this.chatBubbles.push(userMessage);

      //reset User Input
      this.userInput = "";

      //Get response from Assistant
      let assistantChatRequest: AssistantRequest = new AssistantRequest(userInputCopy);
      this.assistantService.getAssistantResponse(assistantChatRequest).pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isAssistantTyping = false)
      ).subscribe({
        next: (res: ResponseData<string>) => {
          if (res.data !== null && res.data != undefined && res.data != "") {
            const assistantResponse: AssistantChatData = new AssistantChatData(res.data || '', SenderTypeEnum.Assistant)

            this.chatBubbles.push(assistantResponse);
          }
        },
        error: (err) => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Error!',
              content: err?.error?.message ?? err?.error?.title ?? 'Error occured!',
            }
          });
        }
      });
    }
  }

  sendMessageOnEnter(event: any) {
    event.preventDefault();
    this.sendMessageToAssistant();
  }

  //automatic scrolldown
  private scrollToBottom(): void {
    if (this.chatContainer?.nativeElement) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}