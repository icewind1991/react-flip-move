import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import FlipMove from '../src';
import FlipMoveWrapper from './helpers/FlipMoveWrapper';
import FlipMoveListItem from './helpers/FlipMoveListItem';

['div', FlipMoveListItem].forEach((type) => {
  const typeLabel = type === 'div' ? 'native' : 'composite';

  storiesOf(`Misc - ${typeLabel}`, module)
    .add('Flex - horizontally centered', () => (
      <FlipMoveWrapper
        itemType={type}
        flipMoveContainerStyles={{ display: 'flex', justifyContent: 'center' }}
        listItemStyles={{
          width: '115px',
          height: '115px',
        }}
      />
    ))
    .add('Flex - vertically centered (BUGGY)', () => (
      <FlipMoveWrapper
        itemType={type}
        flipMoveContainerStyles={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '400px',
        }}
      />
    ))
    .add('Including children without keys', () => (
      <FlipMoveWrapper
        itemType={type}
        items={[
          { id: 'a', text: "7 Insecticides You Don't Know You're Consuming" },
          { id: 'b', text: '11 Ways To Style Your Hair' },
          { text: 'This item has no key' },
          { id: 'c', text: 'The 200 Countries You Have To Visit Before The Apocalypse' },
          { id: 'd', text: 'Turtles: The Unexpected Miracle Anti-Aging Product' },
        ]}
      />
    ))
    .add('falsy children', () => (
      <FlipMoveWrapper
        itemType={type}
        items={[
          { id: 'a', text: "7 Insecticides You Don't Know You're Consuming" },
          { id: 'b', text: '11 Ways To Style Your Hair' },
          null,
          { id: 'c', text: 'The 200 Countries You Have To Visit Before The Apocalypse' },
          { id: 'd', text: 'Turtles: The Unexpected Miracle Anti-Aging Product' },
        ]}
      />
    ))
    .add('Valid children that resolve to null', () => {
      /* eslint-disable react/prop-types */
      class CustomComponent extends Component {
        render() {
          if (!this.props.isVisible) {
            return null;
          }

          return (
            <div>{this.props.children}</div>
          );
        }
      }
      /* eslint-enable */

      return (
        <FlipMove>
          <CustomComponent key="a" isVisible>
            Hello!
          </CustomComponent>
          <CustomComponent key="b" isVisible={false}>
            Hi!
          </CustomComponent>
        </FlipMove>
      );
    })
    .add('Stacked FlipMoves', () => {
      class Example extends React.Component {

        constructor(props){
          super(props);
          this.state = {
            firstSet: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
            secondSet: ['item 6', 'item 7', 'item 8', 'item 9', 'item 10'],
          };
        }

        onRemoveItem = () => {
          const { firstSet } = this.state;

          console.log(firstSet.slice(0, firstSet.length - 1))

          this.setState({
            firstSet: firstSet.slice(0, firstSet.length - 1),
          });
        };

        onAddItem = () => {
          this.setState({
            firstSet: this.state.firstSet.concat(['item' + Math.random()]),
          });
        };

        render(){
          const {firstSet, secondSet} = this.state;

          return (
            <div>
              <section>
                <button onClick={this.onRemoveItem}>Remove item</button>
                <button onClick={this.onAddItem}>Add item</button>
              </section>

              <ul>
                <li style={{backgroundColor: 'rgba(255,0,0, 0.2)'}}>
                  <header>
                    <h2>FlipMove 1</h2>
                  </header>
                  <FlipMove typeName={'ul'} duration="2000" >
                    {firstSet.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: 'block',
                          backgroundColor: 'rgba(255,0,0, 0.2)'
                        }}
                      >
                        {console.log("Mapping", item)}
                        { item }
                      </li>
                    ))}
                  </FlipMove>
                </li>
                <li style={{backgroundColor: 'rgba(0,0,255, 0.2)'}}>
                  <header>
                    <h2>FlipMove 2</h2>
                  </header>
                  <FlipMove typeName={'ul'} duration="2000" >
                    {secondSet.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: 'block',
                          backgroundColor: 'rgba(0,0,255, 0.2)'
                        }}
                      >
                        { item }
                      </li>
                    ))}
                  </FlipMove>
                </li>
              </ul>

            </div>
          );

        }

      }

      return <Example />
    });
});
