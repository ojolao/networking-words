const generateSVG = () => {
  graphics = Viva.Graph.View.svgGraphics();
  graphics.node((node) => {
    const ui = Viva.Graph.svg('g');
    const svgText = Viva.Graph.svg('text').text(node.data.text);
    if (node.data.type === 'whole word') {
      const rect = Viva.Graph.svg('rect')
             .attr('width', 10)
             .attr('height', 10)
             .attr('fill', '#00a2e8');
      ui.append(rect);
    }
    ui.append(svgText);
    return ui;
  }).placeNode((nodeUI, pos) => {
    nodeUI.attr('transform', 'translate(' + (pos.x) + ',' + (pos.y) + ')');
  });
  const renderer = Viva.Graph.View.renderer(graph, {
      container: document.getElementById('displayNetwork'),
      graphics: graphics,
  });
  renderer.run();
};

const generateWebGL = () => {
  const graphics = Viva.Graph.View.webglGraphics();
  const transformIfLetter = (n) => {
    if (n.data.type === 'letter') {
      const nodeUI = graphics.getNodeUI(n.id);
      nodeUI.color = 0xffffffff;
      nodeUI.size = 0;
    }
  };

  const generateDOMLabels = (graph) => {
    const labels = Object.create(null);
    graph.forEachNode((node) => {
      const label = document.createElement('span');
      label.classList.add('node-label');
      label.innerText = node.data.text;
      labels[node.id] = label;
      container.appendChild(label);
    });
    return labels;
  };

  const domLabels = generateDOMLabels(graph);
  graphics.placeNode((ui, pos) => {
    const domPos = {
      x: pos.x,
      y: pos.y,
    };
    graphics.transformGraphToClientCoordinates(domPos);

    transformIfLetter(ui.node);
    const nodeId = ui.node.id;
    if (domLabels[nodeId]) {
      const labelStyle = domLabels[nodeId].style;
      labelStyle.left = domPos.x + 'px';
      labelStyle.top = domPos.y + 'px';
    }
  });
  const renderer = Viva.Graph.View.renderer(graph, {
    container: document.getElementById('displayNetwork'),
    graphics: graphics,
  });
  renderer.run();
};

const generateNodeGraphics = (mode) => {
        if (mode === 'SVG') {
          generateSVG();
        } else if (mode === 'WebGL') {
          generateWebGL();
        }
};
