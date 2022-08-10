import { container } from "tsyringe";

import FabricaRepositoriosInMemory from "./negocio/Fabricas/FabricaRepositoriosInMemory";
import IFabricaRepositorios from "./negocio/Fabricas/IFabricaRepositorios";

container.register<IFabricaRepositorios>("FabricaRepositorios", {
  useClass: FabricaRepositoriosInMemory
});
