import React, { Component } from 'react';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
//import { plantsBySection } from '../utils/catalog';
import './styles/catalog-index.css';
import firebase from 'firebase';
import CatalogGenus from './catalog-genus';
import CatalogSearch from './catalog-search';

export default class CatalogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: this.props.section,
      sectionExpanded: false,
      genusExpanded: false,
      title: this.props.title,
      genusRenderArray: [],
      genuses: [],
      genusKeys: []
    }
  }

  // componentWillMount() {
  //   let { title, section } = this.props;
  //   let self = this;
  //   let genuses = [];
  //   let genusKeys = [];
  //   section.forEach((plant, i) => {
  //     let genusName = plant['Genus'];
  //     let isInArray = genusKeys.indexOf(genusName);
  //     if (isInArray < 0) {
  //       genusKeys.push(genusName);
  //       genuses.push({
  //         key: i,
  //         title: plant['Genus'],
  //         subtitle: `${plant['Genus 2']} ${plant['Species 2']}`,
  //         description: plant['Description'],
  //         hasMultiples: false
  //       });
  //       // console.log('isInArray0', isInArray)
  //     } else {
  //         // console.log('isInArray', isInArray)
  //         genuses[isInArray]['hasMultiples'] = true;
  //         //genusKeys.push(genusName);
  //
  //     }
  //   });
  //   this.setState({ genusKeys: genusKeys });
  //   //console.log('genusKeys', genusKeys);
  //   let genusRenderArray = [];
  //   //console.log('genususeses', genuses)
  //   Object.keys(genuses).map((key, i) => {
  //     if (genuses[key].hasMultiples) {
  //       genusRenderArray.push(<Card key={`genus${i}`}
  //         expandable={true} expanded={this.state.genusExpanded} onExpandChange={this.handleGenusExpandChange.bind(this)} className='genus-card'>
  //         <CardHeader title={<CardTitle title={genuses[key]['title']}
  //           actAsExpander={true}
  //           children={<Toggle
  //             toggled={this.state.genusExpanded}
  //             onToggle={this.handleGenusToggle.bind(this)}
  //             labelPosition='left'
  //             label={genuses[key]['description']}
  //             />}
  //             />}
  //             />
  //             <CatalogGenus
  //               key={genuses[key].key}
  //               section={title}
  //               title={genuses[key].title}
  //               subtitle={genuses[key].subtitle}
  //               description={genuses[key].description}
  //               hasMultiples={genuses[key].hasMultiples}
  //               />
  //         </Card>
  //       );
  //     } else {
  //       genusRenderArray.push(
  //         <Card key={`genus${i}`}
  //           expandable={true} expanded={this.state.genusExpanded} onExpandChange={this.handleGenusExpandChange.bind(this)} className='genus-card'>
  //         <CardHeader title={<CardTitle title={genuses[key]['title']}
  //           actAsExpander={true}
  //           children={<Toggle
  //             toggled={this.state.genusExpanded}
  //             onToggle={this.handleGenusToggle.bind(this)}
  //             labelPosition='left'
  //             label={genuses[key]['description']}
  //             />}
  //             />}
  //             />
  //         <CatalogGenus
  //           expandable={true}
  //           key={genuses[key].key}
  //           section={title}
  //           title={genuses[key].title}
  //           subtitle={genuses[key].subtitle}
  //           description={genuses[key].description}
  //           hasMultiples={genuses[key].hasMultiples}
  //           />
  //         </Card>
  //       );
  //     }
  // });
  //
  //   this.setState({ genuses: genuses, genusRenderArray: genusRenderArray });
  // }

  handleSectionExpandChange(expanded) {
    this.setState({ sectionExpanded: expanded});
    //this.setState({ genuses: genuses });
  }

  handleSectionToggle(event, toggle) {
    let { title, section } = this.props;
    let { genuses } = this.state;

    this.setState({ sectionExpanded: toggle });
  }

  handleGenusExpandChange(expanded) {
    this.setState({ genusExpanded: expanded});
    //this.setState({ genuses: genuses });
  }

  handleGenusToggle(event, toggle) {
    let { title, section } = this.props;
    let { genuses } = this.state;

    this.setState({ genusExpanded: toggle });
  }

  render() {
    let { section, title } = this.props;
    return (
      <Card key={title} expanded={this.state.sectionExpanded} onExpandChange={this.handleSectionExpandChange.bind(this)} className='section-card'>
        <CardHeader title={<CardTitle title={title}
          actAsExpander={true}
          children={<Toggle
            toggled={this.state.sectionExpanded}
            onToggle={this.handleSectionToggle.bind(this)}
            />}
            />}
            />
          {(section) ? Object.keys(section).map((key, i) => {
            return <CatalogGenus genus={section[key]} key={i} title={key} expandable={true} /> 
          }) : null}
        </Card>
    );
  }
}

  // getGenus(genusName, genusArrayPosition) {
  //   let { title } = this.props;
  //   let { genusRefs } = this.state;
  //   let ref = firebase.database().ref(`catalog/${title}`)
  //     .orderByChild('Genus')
  //     .startAt(genusName)
  //     .endAt(genusName)
  //   genusRefs.push(ref);
  //   this.setState({ genusRefs: genusRefs });
  //   ref.on('value', (snapshot) => {
  //     let plants = snapshot.val();
  //     let { genusKeys, genusRenderArray } = this.state;
  //     Object.keys(plants).map((key) => {
  //       genusRenderArray[genusArrayPosition].push(<Card key={`variety${key}`} expandable={true} className='plant-card'>
  //
  //       <CardHeader title={plants[key]['Variety 2']}
  //         subtitle={`${plants[key]['Genus 2']} ${plants[key]['Species 2']}`}
  //         />} />
  //       <CardText><div dangerouslySetInnerHTML={{__html: plants[key]['Description']}}></div></CardText>
  //       <CardText>Size: {plants[key]['GROWPOINT ITEMDESC']}
  //       </CardText>
  //       <CardText>Volume: {plants[key]['Volume US (Metric)']}
  //       </CardText>
  //       {(undefined !== plants[key]['Color']) ? this.renderColor(plants[key]['Color']) : null}
  //       <CardText>Pot Category: {plants[key]['Pot Category']}
  //       </CardText>
  //       <CardText>Macore ID: {plants[key]['MACORE ID']}
  //       </CardText>
  //       <CardText>Exposure: {plants[key]['Exposure']}
  //       </CardText>
  //       </Card>
  //       );
  //     });
  //     // console.log('renderarray', genusRenderArray);
  //     this.setState({ genusRenderArray: genusRenderArray });
  //   });
  // }

  // renderColor(colors) {
  //   let colorsLength = Object.keys(colors).length
  //
  //   let renderArray = [];
  //   let firstPart = 'Color'
  //   if (colorsLength > 1) {
  //     firstPart += 's';
  //   }
  //   Object.keys(colors).map((key, i) => {
  //     renderArray.push(<CardText key={i}>{`${firstPart}: ${colors[key]}`}</CardText>);
  //   });
  //
  //   return renderArray;
  // }

    // genusRenderArray.forEach((genusRender, i) => {
    //   renderArray.push(<Card key={`genus${i}`} expandable={true} className='genus-card'>
    //   {genusRenderArray[i].forEach((varietyRender) => {
    //     return varietyRender
    //   })}
    // </Card>);
    // });




  // actAsExpander={true}
  // children={<Toggle
  //   toggled={this.state.expanded}
  //   onToggle={this.handleToggle}
    // let genuses = {};
    // Object.keys(genusKeys).map((genusKey) => {
    //   let genusName = genusKeys[genusKey];
    //   if (undefined === genuses[genusName]) {
    //     genuses[genusName] = [];
    //   }
    // });
    // Object.keys(section).map((key) => {
    //   // if basil matches section['Genus']
    //   genuses[section[key]['Genus']].push(section[key]);
    // });
    // let renderArray = [];
    // Object.keys(genuses).map((key) => {
    //   renderArray.push(this.renderSection(genuses[key]));
    // });

    // this.setState({ section: section, genusKeys: genusKeys, genuses: genuses, renderArray: renderArray });

  // renderSection(genus) {
  //   let plantRenderArray = [];
  //   if (undefined !== genus) {
  //     return (<CatalogGenus expandable={true} genus={genus} title={genus[0]['Genus']} key={genus[0]['Genus']} />);
  //   }
  // }


// {(renderArray) ? renderArray : null}
