import React from 'react';
import '../styles/index.scss';
import { Destination, CalculationResult, CalculationItem } from '../types';
import { Calculate } from '../functions/calculate-route';
import { convertResultToStringArray } from '../functions/utils';
import { GraphicalUI } from './graphical-ui';
import { ResultView } from './result-view';
import { ConnectionsInfo } from './connections-info';

interface ComponentProps {}

interface LocalState {
  siteA?: Destination;
  siteB?: Destination;
  result?: CalculationResult[];
  bestResult?: CalculationItem;
  connectionsInfoDisplay: boolean;
}

const initialState: LocalState = {
  siteA: undefined,
  siteB: undefined,
  result: undefined,
  bestResult: undefined,
  connectionsInfoDisplay: false
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
    this.toggleConnectionsInfoDisplay = this.toggleConnectionsInfoDisplay.bind(this);
  }
  
  handleWindowResize() {
    if(this.state.result) {
      this.reset();
    }
  }

  componentWillMount(){
    // Reset on screen resize to handle changes to layout
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidUpdate() {
    // Automatically calculate results when the second orb is selected
    if (this.state.siteA && this.state.siteB && !this.state.result) {
        this.calculate();
    }
  }

  // Handle selection of first orb
  updateInputA(siteA: Destination) {
    this.setState({ siteA });
  }
  
  // Handle selection of second orb
  updateInputB(siteB: Destination) {
    this.setState({ siteB });
  }

  // Calculate the shortest path between the two selected routes
  calculate() {
    const { siteA, siteB } = this.state;
    const result: CalculationItem[] = Calculate(siteA!, siteB!);
    // Best result will always be index 0 as it is a sorted array
    const bestResult: CalculationItem = result[0];
    this.setState({ result: convertResultToStringArray(result), bestResult });
  }

  // Set state back to original state
  reset() {
    this.setState(initialState);
  }

  // Reset state and display table of connection content
  toggleConnectionsInfoDisplay() {
    const connectionsInfoDisplay = !this.state.connectionsInfoDisplay;
    this.setState({ ...initialState, connectionsInfoDisplay });
  }

  renderToolbar(): JSX.Element {
    return <div id="toolbar">
        <button onClick={this.reset}>
          Reset
        </button>
        <button id="view-switcher" onClick={this.toggleConnectionsInfoDisplay}>
          View
        </button>
      </div>
  }

  renderUI(): JSX.Element {
    // Display table of connection contents when active
    if (this.state.connectionsInfoDisplay) {
      return ConnectionsInfo();
    }

    // Display result view when calculation has been done
    if(this.state.bestResult) {
      return <ResultView
        result={this.state.bestResult} />
        
    }

    return <GraphicalUI
      siteA={this.state.siteA}
      siteB={this.state.siteB}
      calculate={this.calculate}
      updateInputA={this.updateInputA}
      updateInputB={this.updateInputB}
      result={this.state.bestResult} />

  }

  render() {
    return <div>
      {this.renderToolbar()}
      {this.renderUI()}
    </div>
  }
}
