import * as vscode from 'vscode';

const CONFIG_KEY = 'activityBarSeparator';
const COUNT_KEY = 'count';

export function activate(context: vscode.ExtensionContext) {
    console.log('----- Activity Bar Separator -----');

	for (let i = 0; i < 10; i++) {
		const disposable = vscode.window.registerWebviewViewProvider(
			`separator${i + 1}`, { resolveWebviewView: (_: vscode.WebviewView) => {} }
		);
		context.subscriptions.push(disposable);
	}
		
    context.subscriptions.push(
        vscode.commands.registerCommand('activityBarSeparator.setCount', async () => {
            const currentCount = vscode.workspace.getConfiguration(CONFIG_KEY).get<number>(COUNT_KEY, 1);
            const count = await vscode.window.showInputBox({
                prompt: 'Enter number of separators (1-10)',
                value: currentCount.toString(),
                validateInput: value => {
                    const num = parseInt(value);
                    if (isNaN(num)) {return 'Please enter a valid number';}
                    if (num < 1 || num > 10) {return 'Please enter a number between 1 and 10';}
                    return null;
                }
            });

            if (count) {
                await vscode.workspace.getConfiguration()
                    .update(
                        `${CONFIG_KEY}.${COUNT_KEY}`,
                        parseInt(count),
                        vscode.ConfigurationTarget.Global
                    );
            }
        })
    );
}

export function deactivate() {}
