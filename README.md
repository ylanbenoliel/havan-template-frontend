# Estrutura do projeto 🏛

Dentro da pasta `src` temos 2 pastas especiais que serão explicadas mais abaixo:

- `App`
- `shared`

A pasta `modules` deve seguir a estrutura das rotas da aplicação.

> Exemplo: o módulo `Dashboard` deve ser respectivamente a rota de `/dashboard`. Caso precisemos de uma rota `/dashboard/historico-de-compras`, a pasta `HistoricoDeCompras` deverá ficar dentro de `Dashboard` resultando em `src/modules/Dashboard/HistoricoDeCompras`

<u>A principal regra a ser seguida é</u>:

**Arquivos de um módulo so poderão ser importados por arquivos que estejam neste mesmo módulo, ou de `src/shared`!!** Isso faz com que seja mais fácil entender o projeto, e caso o desenvolvedor faça alterações em 1 módulo, os outros não deverão ser afetados.

<br>

| Arquivo ou Pasta | Descrição                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/index.tsx`  | Ponto de entrada da aplicação. É aqui onde injetamos o App no `root` da DOM.                                                                                                                                                   |
| `index.html`     | Único arquivo HTML da aplicação. Aqui é onde os scripts e estilos serão injetados pelo bundler da aplicação.                                                                                                                   |
| `src/App`        | Onde ficam definidas as rotas da aplicação, componentes que são montados independente de qual rota está ativa, estilos CSS globais, fonts, etc. Basicamente qualquer coisa considerado global ou ancestor de todos os módulos. |
| `src/modules`    | Módulos da aplicação que devem seguir a estrutura de rotas.                                                                                                                                                                    |
| `src/shared`     | Componentes, constantes, utils, hooks, estilos, store, etc, que podem ser usados em qualquer parte da aplicação. Qualquer módulo pode importar de `shared`.                                                                    |

# Conflito de import

Em caso de conflito de import de tipo (types ou interfaces) com alguma implementação concreta, deve-se renomear a implementação concreta:
Ex:

```typescript
import { NotaFiscal } from "src/shared/types";
import { NotaFiscal as NotaFiscalDictionary } from "src/shared/constants/notaFiscal";
```
