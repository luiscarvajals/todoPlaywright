import { Expect, Locator, Page } from "@playwright/test";

export class EliminarProyectosPages {
    readonly page: Page;
    readonly url = "https://todo.ly/";
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly subproyecto: Locator;
    readonly proyecto: Locator;
    readonly options: Locator;
    readonly delete: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("#ctl00_MainContent_LoginControl1_TextBoxEmail");
        this.passwordInput = page.locator("#ctl00_MainContent_LoginControl1_TextBoxPassword");
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.subproyecto = page.locator("#mainProjectList div").filter({ hasText: "Subproyecto 1" });
        this.proyecto = page.locator("#mainProjectList div").filter({ hasText: "Proyecto 1" });
        this.options = page.getByRole('img', { name: 'Options' });
        this.delete = page.getByRole('link', { name: 'Delete', exact: true });
    }

    async open() {
        await this.page.goto(this.url);
    }

    async login(email: string, password: string) {
        await this.page.locator('.HPHeaderLogin > a').click();
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async eliminarSubproyecto() {
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
            console.log("Subproyecto eliminado");
          });

        await this.subproyecto.click();
        await this.options.click();
        await this.delete.click();

        await this.page.waitForTimeout(2000);
        await this.page.reload();
    }

    async validarSubproyectoEliminado() {
        const isSubproyectoVisible = await this.subproyecto.isVisible().catch(() => false);
        if(isSubproyectoVisible) {
            throw new Error("El subproyecto no fue eliminado");
        }
        console.log("Validación de subproyecto eliminado");
    }

    async eliminarProyecto() {
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
            console.log("Proyecto eliminado");
          });

        await this.proyecto.click();
        await this.options.click();
        await this.delete.click();

        await this.page.waitForTimeout(2000);
        await this.page.reload();
    }

    async validarProyectoEliminado() {
        const isProyectoVisible = await this.proyecto.isVisible().catch(() => false);
        if(isProyectoVisible) {
            throw new Error("El proyecto no fue eliminado");
        }
        console.log("Validación de proyecto eliminado");
    }
}

