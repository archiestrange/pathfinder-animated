import React from 'react';
import '../styles/index.scss';
import { Destination, CalculationResult, CalculationItem } from '../types';
import { Calculate } from '../functions/calculate-route';
import { convertResultToStringArray } from '../functions/utils';
import { GraphicalUI } from './graphical-ui';
import { ResultView } from './result-view';

interface ComponentProps {}

interface LocalState {
  siteA?: Destination;
  siteB?: Destination;
  result?: CalculationResult[];
  bestResult?: CalculationItem;
}

const initialState: LocalState = {
  siteA: undefined,
  siteB: undefined,
  result: undefined,
  bestResult: undefined
};

export class Pathfinder extends React.Component<ComponentProps, LocalState> {
  
  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
    this.updateInputA = this.updateInputA.bind(this);
    this.updateInputB = this.updateInputB.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }
  
  handleWindowResize() {
    if(this.state.result) {
      this.reset();
    }
  }

  componentWillMount(){
    // Stop fixed svg lines moving out of place on window resize
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidUpdate() {
    // Automatically calculate results when the second orb is selected
    if (this.state.siteA && this.state.siteB && !this.state.result) {
        this.calculate();
    }
  }

  // Handle selection of first orb
  updateInputA(siteA: Destination): void {
    this.setState({ siteA });
  }
  
  // Handle selection of second orb
  updateInputB(siteB: Destination): void {
    this.setState({ siteB });
  }

  // Calculate the shortest path between the two selected routes
  calculate(): void {
    const { siteA, siteB } = this.state;
    const result = Calculate(siteA!, siteB!);
    this.setState({ result: convertResultToStringArray(result), bestResult: result[0] });
  }

  // Set state back to original state
  reset() {
    this.setState(initialState);
  }

  renderUI () {
    if(this.state.bestResult) {
      return <ResultView
        result={this.state.bestResult} />
    } else {
      return <GraphicalUI
        siteA={this.state.siteA}
        siteB={this.state.siteB}
        calculate={this.calculate}
        updateInputA={this.updateInputA}
        updateInputB={this.updateInputB}
        result={this.state.bestResult} />
    }
  }

  render() {
    return <div>
      <div id="toolbar">
        <button onClick={this.reset}>Reset</button>
      </div>
      {this.renderUI()}
    </div>
  }
}
