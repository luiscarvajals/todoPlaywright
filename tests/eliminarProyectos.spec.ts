import test from "@playwright/test";
import { EliminarProyectosPages } from "../pages/eliminarProyectos.pages";

test("Eliminar Subproyecto", async ({ page }) => {
    const eliminarSubproyectoPages = new EliminarProyectosPages(page);
    await eliminarSubproyectoPages.open();
    await eliminarSubproyectoPages.login("luis.carvajal.s@ucb.edu.bo", "luisucb");
    await eliminarSubproyectoPages.eliminarSubproyecto();
    await eliminarSubproyectoPages.validarSubproyectoEliminado();
});

test("Eliminar Proyecto", async ({ page }) => {
    const eliminarProyectoPages = new EliminarProyectosPages(page);
    await eliminarProyectoPages.open();
    await eliminarProyectoPages.login("luis.carvajal.s@ucb.edu.bo", "luisucb");
    await eliminarProyectoPages.eliminarProyecto();
    await eliminarProyectoPages.validarProyectoEliminado();
});