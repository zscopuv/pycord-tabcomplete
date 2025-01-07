import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // This event is triggered when the document is updated
    const disposable = vscode.workspace.onDidChangeTextDocument((event) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const fullText = document.getText();
        
        // Check if 'client.init' is in the document
        if (fullText.includes('client.init')) {
            // Replace 'client.init' with the provided bot code
            const replaceText = `
import discord
from discord.ext import commands
from discord.ui import Button, View

class Client(commands.Bot):
    def __init__(self):
        super().__init__(intents=discord.Intents.all())
    
    async def on_ready(self):
        print(f'Connection Initialized, logged in as: {self.user}.')

client = Client()


client.run("TOKEN")
`;

            // Replace 'client.init' in the document
            const startPos = fullText.indexOf('client.init');
            const endPos = startPos + 'client.init'.length;

            editor.edit(editBuilder => {
                editBuilder.replace(new vscode.Range(document.positionAt(startPos), document.positionAt(endPos)), replaceText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
