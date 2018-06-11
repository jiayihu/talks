/* eslint-disable global-require, react/jsx-filename-extension, max-len, react/require-extension */

import React from 'react';
import preloader from 'spectacle/lib/utils/preloader';
import {
  Appear, BlockQuote, Cite, CodePane, Deck, Heading, Image, Link, ListItem, List, Notes, Slide, Spectacle,
  Table, TableHeaderItem, TableItem, TableRow, Text,
} from 'spectacle';
import CodeSlide from 'spectacle-code-slide';
import { Code, Divider, Span, Title } from './components/';
import theme, { colors } from './theme';

// Require CSS
require('normalize.css');
require('spectacle/lib/themes/default/index.css');

const images = {
  angular: require('./assets/angular.svg'),
  angularMaterial: require('./assets/angular-material.png'),
  api: require('./assets/api.png'),
  ast: require('./assets/ast.png'),
  ngBootstrap: require('./assets/ng-bootstrap.png'),
  mind: require('./assets/mind.gif'),
  primeng: require('./assets/primeng.png'),
  thanks: require('./assets/thanks.gif'),
  typedoc: require('./assets/typedoc.png'),
  whatElse: require('./assets/what-else.gif'),
  wow: require('./assets/wow.gif'),
};

preloader(images);

export default class Presentation extends React.Component {
  render() {
    return (
      <div>
        <Spectacle theme={theme}>
          <Deck transition={['fade']} transitionDuration={500} progress="number">
            <Slide textAlign="left">
              <Heading sizeize={2}>
                Jiayi Hu
              </Heading>
              <Divider margin="40px 0 0" />
              <Text>Front-end developer and consultant</Text>
              <Divider margin="40px 0 0" />
              <Text>
                <Link href="https://github.com/jiayihu">Github: https://github.com/jiayihu</Link>
              </Text>
              <Text>
                <Link href="https://twitter.com/jiayi_ghu">Twitter: @jiayi_ghu</Link>
              </Text>
              <Text>
                <Link href="https://twitter.com/jiayi_ghu">Email: jiayi.ghu@gmail.com</Link>
              </Text>
            </Slide>

            <Slide>
              <Image src={images.angular} width={250} />
              <Heading size={1}>Automatic</Heading>
              <Divider></Divider>
              <Heading size={3} fit>UI-library documentation</Heading>
            </Slide>

            <Slide>
              <Heading size={3} fit>What is a UI library?</Heading>
              <List>
                <ListItem>Condiviso ma unico</ListItem>
                <ListItem>Context-free</ListItem>
                <ListItem>UI, colori e UX consistente</ListItem>
              </List>
            </Slide>

            <Slide>
              <Image src={images.ngBootstrap} />
            </Slide>

            <Slide>
              <Image src={images.angularMaterial} />
            </Slide>

            <Slide>
              <Image src={images.primeng} />
            </Slide>
{/* Spiegato in slide precedente
            <Slide notes={`
            Solidità poiché battle tested e con unit testing.<br />
            Consistente implementazione e design patterns
            `}>
              <Heading size={3} fit>Why bulding an UI library?</Heading>
              <List>
                <ListItem>Solidità</ListItem>
                <ListItem>Riduzione complessità</ListItem>
                <ListItem>Consistenza dell'implementazione</ListItem>
                <ListItem>Re-usability</ListItem>
                <ListItem>Consistenza UI/UX e brand</ListItem>
              </List>
            </Slide>*/}

            <Slide>
              <Heading size={3}>Requisiti</Heading>
              <List>
                <ListItem><Span bold>Facilità d'uso</Span></ListItem>
                <ListItem><Span bold>Consistente</Span></ListItem>
                <ListItem>Isolamento ed indipendenza</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={3}>Style Guide</Heading>
              <List>
                <ListItem>1. Documentazione API</ListItem>
                <ListItem>2. Esempi live</ListItem>
                <ListItem>3. Snippet esempi e use cases</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={2}>How?</Heading>
            </Slide>

            <Slide>
              <Heading size={3}>1. Documentazione API</Heading>
            </Slide>

            <Slide>
              <Image src={images.api} />
            </Slide>

            <Slide>
              <Heading size={3}>Cosa documentare</Heading>

              <List>
                <ListItem>1. Descrizione component/direttiva/service</ListItem>
                <ListItem>2. Inputs/Outputs</ListItem>
                <ListItem>3. Campi/Metodi pubblici</ListItem>
                <ListItem>4. Tipi/Interfacce pubbliche</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={3}>Come documentare</Heading>

              <List>
                <ListItem>1. Manualmente</ListItem>
                <ListItem>2. Commenti JSDoc/ESDoc</ListItem>
                <ListItem>3. Typescript?</ListItem>
              </List>
            </Slide>

            <Slide notes="Il team usa difatti già Typescript">
              <Heading size={3}>Why Typescript</Heading>

              <List>
                <ListItem>Precisione e Potenza espressiva</ListItem>
                <ListItem>Scriviamo già i tipi</ListItem>
                <ListItem>Familiarità</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={2}>Welcome AST</Heading>
              <Heading size={4} fit>(Abstract Syntax Tree)</Heading>
            </Slide>

            <Slide>
              <Heading size={3} fit>Compilatore Typescript</Heading>

              <BlockQuote>
                <Cite>
                  Transforms source code written in a programming language 
                  (the source language) into another computer language (the target language)
                </Cite>
              </BlockQuote>
            </Slide>

            <Slide notes={`
            Parsing is taking raw code and turning it into a more abstract representation of the code.
            Transformation takes this abstract representation and manipulates to do whatever the compiler wants it to.
            Code Generation takes the transformed representation of the code and turns it into new code.
            `}>
              <Heading size={3} fit>Fasi compilazione</Heading>

              <List ordered>
                <ListItem>1. Parsing</ListItem>
                <ListItem>2. Transformation</ListItem>
                <ListItem>3. Code generation</ListItem>
              </List>
            </Slide>

            <Slide notes={`
              function sayHello(message: string): string { return message || 'Hello Angular Day!'; } <br/>
              console.log(sayHello());
            `}>
              <Heading size={3} fit>Abstract Syntax Tree</Heading>
              <Image src={images.ast}></Image>

              <Link href="https://astexplorer.net/">AST Explorer</Link>
            </Slide>

            <Slide bgImage={images.wow}>
            </Slide>

            <Slide>
              <Heading size={3}>AST use cases</Heading>

              <List>
                <ListItem>Trasformazione (Typescript/Babel)</ListItem>
                <ListItem>Ottimizzazione (prepack/babili)</ListItem>
                <ListItem>Linting (tslint)</ListItem>
                <ListItem>Formattazione (prettier)</ListItem>
                <ListItem>Documentazione</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={4}>The sky is the limit.</Heading>
            </Slide>

            <Slide>
              <Heading size={3}>TS Compiler API</Heading>
            </Slide>

            <CodeSlide
              transition={[]}
              lang="typescript"
              code={require('./examples/linter.ts')}
              ranges={[
                { loc: [0, 3], title: 'Compiler API' },
                { loc: [48, 56] },
                { loc: [6, 16] }
              ]}
            />

            <Slide>
              <Heading size={3}>Problems</Heading>

              <List>
                <ListItem>Troppi tipi: <Code>primitivi, array, Generics, type, Interfaces, Classes, enum, union</Code> etc.</ListItem>
                <ListItem>Troppo a basso livello</ListItem>
                <ListItem>Tipi => toString()</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={3}>Typecode</Heading>

              <Image src={images.typedoc}></Image>
            </Slide>

            <Slide notes="Non usiamo il Renderer per maggiore flessibilità">
              <Heading size={3}>Typecode</Heading>

              <List>
                <ListItem>Warning: nessuna documentazione ufficiale</ListItem>
                <ListItem>2 parti: <Span bold>Converter</Span> e <Span>Renderer</Span></ListItem>
              </List>

              <Link href="http://typedoc.org/api/">Converter API</Link>
            </Slide>

            <CodeSlide
              transition={[]}
              lang="js"
              code={require('./examples/typedoc')}
              ranges={[
                { loc: [0, 2], title: 'Converter API' },
                { loc: [3, 6], title: 'Reflection' },
                { loc: [7, 16] },
                { loc: [17, 18] },
                { loc: [19, 20] }
              ]}
            />

            <CodeSlide
              transition={[]}
              lang="js"
              code={require('./examples/traverse')}
              ranges={[
                { loc: [0, 0], title: 'Traverse' },
                { loc: [0, 9], title: 'getDecoratedClasses' },
                { loc: [7, 23], title: 'getComponentsMembers' },
                { loc: [24, 31], title: 'traverseMembers' },
                { loc: [34, 48] },
                { loc: [49, 52] },
                { loc: [54, 60], title: 'getComponentsTypes' },
                { loc: [61, 72] },
                { loc: [73, 84] }
              ]}
            />

            <Slide>
              <Image src={images.api}></Image>
            </Slide>

            <Slide>
              <CodePane lang="json" source={require('raw!./examples/json.json')}></CodePane>
            </Slide>

            <Slide bgColor={colors.sunflower}>
              <Heading size={3} textColor={colors.white}>Demo time!</Heading>
            </Slide>

            <Slide bgImage={images.mind}></Slide>

            <Slide>
              <Heading size={3}>What more</Heading>

              <List>
                <ListItem>Markdown documentation</ListItem>
                <ListItem>Live examples</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={3}>Markdown documentation</Heading>

              <List>
                <ListItem>Facile, veloce, pulito</ListItem>
                <ListItem>Portabile</ListItem>
                <ListItem>Convertibile</ListItem>
                <ListItem>Nice diffs</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={3}>Markdown documentation</Heading>

              <Code>const readmeSrc = require('/src/accordion/README.md');</Code>

              <List>
                <ListItem>Webpack loader</ListItem>
                <ListItem>Markdown renderer => HTML</ListItem>
                <ListItem><Code size="small">&lt;div [innerHTML]="markdown"&gt;&lt;/div&gt;</Code></ListItem>
              </List>
            </Slide>

            <Slide bgImage={images.whatElse}></Slide>

            <Slide>
              <Heading size={3}>Live examples</Heading>

              <List>
                <ListItem>Comprensibilità</ListItem>
                <ListItem>Facilità d'uso</ListItem>
                <ListItem>Use cases comuni</ListItem>
                <ListItem>Copy & Paste</ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={3}>From Markdown</Heading>

              <List>
                <ListItem>Markdown => HTML => Angular template</ListItem>
                <ListItem>Runtime renderer</ListItem>
              </List>
            </Slide>

            <Slide>
              <CodePane lang="markdown" source={require('raw!./examples/markdown.md')}></CodePane>
            </Slide>

            <CodeSlide
              transition={[]}
              lang="typescript"
              code={require('./examples/renderer.ts')}
              ranges={[
                { loc: [0, 0], title: 'renderTemplate' },
                { loc: [0, 8] },
                { loc: [9, 22] },
                { loc: [23, 36] }
              ]}
            />

            <Slide>
              <Heading size={3}>Riassumendo</Heading>

              <List>
                <ListItem>UI Library</ListItem>
                <ListItem><Span strike>Documentazione API</Span></ListItem>
                <ListItem>Documentazione Markdown</ListItem>
                <ListItem><Span strike>Live example</Span></ListItem>
              </List>
            </Slide>

            <Slide>
              <Heading size={4}>+ Produttività 💣</Heading>
            </Slide>

            <Slide>
              <Heading size={4}><Span strike>+ Produttività</Span> </Heading>
              <Heading size={4}>+ Twitter 👨🏻‍💻</Heading>
            </Slide>

            <Slide bgColor={colors.sunflower}>
              <Heading size={3} textColor={colors.white}>Thanks!</Heading>
            </Slide>

            <Slide bgImage={images.thanks} />

            <Slide>
              <Text>Trovate le slides su:</Text>
              <Link href="http://bit.ly/2sAn7rL">http://bit.ly/2sAn7rL</Link>
            </Slide>
          </Deck>
        </Spectacle>
      </div>
    );
  }
}
