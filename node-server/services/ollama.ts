import ollama, { ChatResponse, Message } from 'ollama';
import os from 'os';

interface OllamaConfig {
    model?: string;
    contextLimit?: number;
    numCtx?: number;
    numThread?: number;
    numBatch?: number;
    nmap?: boolean;
    f16?: boolean;
    temperature?: number;
    maxTokens?: number;
}

class Ollama{
    private model: string;
    private context: Message[] = [];
    private contextLimit: number;
    private ollamaParams: any;

    constructor(config: OllamaConfig = {}) {
        this.model = config.model || 'llama3:8b';
        this.contextLimit = config.contextLimit || 4;
        this.ollamaParams = {
            num_ctx: config.numCtx || 512,
            num_thread: config.numThread || Math.max(1, os.cpus().length - 1),
            num_batch: config.numBatch || 256,
            nmap: config.nmap !== undefined ? config.nmap : true,
            f16: config.f16 !== undefined ? config.f16 : true
        };
        this.addToContext({
            role: 'system',
            content: "Your name is Ana. You are Vision's WebAR AI. Respond cordially, naturally, and with a friendly, sympathetic tone. Respond in the language the user asks you. Provide precise, concise answers. Vision WebAR is an open-source platform for developing augmented reality interfaces on mobile devices or tablets for non-tech people. Make users feel welcome and supported as a helpful companion."
        });
    };

    async streamResponse(prompt: string, images: string[] = [], responseHandler: (part: ChatResponse) => void): Promise<void> {
        try {
            this.addToContext({ role: 'user', images, content: prompt });
            const response = await ollama.chat({
                model: this.model,
                messages: this.context,
                stream: true,
                options: this.ollamaParams
            });
            let assistantResponse = '';
            for await (const part of response) {
                responseHandler(part);
                assistantResponse += part.message.content;
            }
            this.addToContext({ role: 'assistant', content: assistantResponse });
        } catch (error) {
            console.error('@services/ollama.ts: error obtaining ollama response ->', error);
        }
    }

    private addToContext(message: Message): void {
        if(this.context.length >= this.contextLimit){
            this.context = this.context.slice(-this.contextLimit + 1);
        }
        this.context.push(message);
    }
};

export default Ollama;