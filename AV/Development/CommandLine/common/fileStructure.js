import { Directory, File } from "./fileSystemEntity.js";

const margin = { top: 30, right: 90, bottom: 30, left: 90 };

const rectangleDimensions = { width: 76, height: 30 };

const durations = {
  nodes: { enter: 1000, exit: 1000, update: 2000 },
  paths: { enter: 3000, exit: 3000, update: 2000 },
};

const delays = {
  nodes: {},
  paths: {},
};

delays.paths.exit = 0;
delays.nodes.exit = delays.paths.exit + durations.paths.exit - 1000;
delays.paths.update = delays.nodes.exit + durations.nodes.exit - 1000;
delays.nodes.update = delays.paths.update;
delays.nodes.enter = delays.nodes.update + durations.nodes.update - 1000;
delays.paths.enter = delays.nodes.enter + durations.nodes.enter - 1000;

const colors = {
  file: { background: "#add8e6", text: "black" },
  directory: { background: "#0c3762", text: "white" },
  current: { background: "green", text: "white" },
  highlight: { background: "orange", text: "white" },
};

function renderFileStructureVisualization(data, currDirId, width, height, id) {
  const svgData = renderSVG(width, height, id);
  updateFileStructureVisualization(svgData, data, -1 * delays.nodes.enter);
  colorNode(svgData.group, currDirId, colors.current.background);

  return svgData;
}

function renderGitVisualization(
  localHomeDir,
  remoteHomeDir,
  localInitialCommit,
  remoteInitialCommit,
  width,
  height,
  id
) {
  const svgData = renderSVG(width, height, id);
  updateGitVisualization(
    svgData,
    localHomeDir,
    remoteHomeDir,
    localInitialCommit,
    remoteInitialCommit
  );

  return svgData;
}

function renderSVG(width, height, id) {
  const svgWidth = width - margin.left - margin.right;
  const svgHeight = height - margin.top - margin.bottom;

  const svg = d3
    .select(id)
    .append("svg")
    .attr("width", svgWidth + margin.left + margin.right)
    .attr("height", svgHeight + margin.top + margin.bottom);

  const svgGroup = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  return { group: svgGroup, width: svgWidth, height: svgHeight };
}

function selectNode(svgGroup, id) {
  return svgGroup.selectAll(".node").filter(function (d) {
    return d.data.id === id;
  });
}

function colorNode(svgGroup, id, color) {
  selectNode(svgGroup, id)
    .select("rect")
    .transition()
    .duration(1000)
    .style("fill", color);
}

function highlightNode(svgGroup, id, color, prevColor, prevText) {
  const node = selectNode(svgGroup, id);
  node.select("rect").transition().duration(1000).style("fill", color);
  node.select("text").transition().duration(1000).style("fill", "black");
  node
    .select("rect")
    .transition()
    .duration(1000)
    .delay(3000)
    .style("fill", prevColor);
  node
    .select("text")
    .transition()
    .duration(1000)
    .delay(3000)
    .style("fill", prevText);
}

function updateFileStructureVisualization(svgData, data, delayOffset) {
  const svgGroup = svgData.group;

  const treemap = d3.tree().size([svgData.width, svgData.height]);

  const hierarchyData = d3.hierarchy(data);

  const treeData = treemap(hierarchyData);

  console.log("descendats", treeData.descendants());

  // adds the nodes
  const nodes = svgGroup
    .selectAll(".node")
    .data(treeData.descendants(), function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          })
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6);

        nodes
          .append("rect")
          .attr("width", rectangleDimensions.width)
          .attr("height", rectangleDimensions.height)
          .attr("x", -rectangleDimensions.width / 2)
          .attr("y", -rectangleDimensions.height / 2)
          .style("fill", (d) => {
            return d.data.isDirectory
              ? colors.directory.background
              : colors.file.background;
          })
          .attr("stroke", "black")
          .attr("rx", 5)
          .attr("ry", 5);

        nodes
          .append("text")
          .attr("dy", ".35em")
          .attr("font-size", "0.8rem")
          .style("fill", (d) => {
            return d.data.isDirectory
              ? colors.directory.text
              : colors.file.text;
          })
          .style("text-anchor", "middle")
          .text(function (d) {
            return d.data.name;
          });

        nodes
          .transition()
          .duration(durations.nodes.enter)
          .delay(delays.nodes.enter + delayOffset)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1);

        return nodes;
      },
      function (update) {
        return update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
      },
      function (exit) {
        return exit
          .transition()
          .duration(durations.nodes.exit)
          .delay(delays.nodes.exit + delayOffset)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );

  // adds the links between the nodes
  const links = svgGroup
    .selectAll(".link")
    .data(treeData.descendants().slice(1), function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("path")
          .lower()
          .attr("class", "link")
          .attr("d", function (d) {
            return `M ${d.x} , ${d.y} 
                      V ${(d.y + d.parent.y) / 2} 
                      H ${d.parent.x} 
                      V ${d.parent.y}`;
          })
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .transition()
          .delay(delays.paths.enter + delayOffset)
          .duration(durations.paths.enter)
          .attr("stroke-dashoffset", 0);

        return nodes;
      },
      function (update) {
        return update
          .transition()
          .duration(durations.paths.update)
          .delay(delays.paths.update + delayOffset)
          .attr("d", function (d) {
            return `M ${d.x} , ${d.y} 
                    V ${(d.y + d.parent.y) / 2} 
                    H ${d.parent.x} 
                    V ${d.parent.y}`;
          })
          .each(function (d) {
            d.totalLength = 1000;
          })
          .attr("stroke-dasharray", (d) => {
            return d.totalLength + " " + d.totalLength;
          })
          .attr("stroke-dashoffset", 0);
      },
      function (exit) {
        return exit
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", 0)
          .attr("stroke-dashoffset", 0)
          .transition()
          .delay(delays.paths.exit + delayOffset)
          .duration(3000)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .remove();
      }
    );
}

function updateGitVisualization(
  svgData,
  localHomeDir,
  remoteHomeDir,
  localInitialCommit,
  remoteInitialCommit
) {
  const delayOffset = 0;

  const { group, width, height } = svgData;

  const treemap = d3.tree().size([height / 2, width / 2]);

  const hierarchyData = d3.hierarchy(localInitialCommit);

  const treeData = treemap(hierarchyData);

  console.log("treeData", treeData);

  createFileTree(
    group,
    localHomeDir,
    "local",
    width / 2,
    height / 2,
    0,
    0,
    0,
    0.7
  );

  createFileTree(
    group,
    remoteHomeDir,
    "remote",
    width / 2,
    height / 2,
    width / 2,
    0,
    0,
    0.7
  );

  createCommitTree(
    group,
    localInitialCommit,
    "local-commit",
    width / 2,
    height / 2,
    -45,
    height / 2,
    0,
    15
  );

  createCommitTree(
    group,
    remoteInitialCommit,
    "remote-commit",
    width / 2,
    height / 2,
    width / 2 + 45,
    height / 2,
    0,
    15
  );
}

const createFileTree = (
  svgGroup,
  directory,
  label,
  width,
  height,
  xOffset,
  yOffset,
  delayOffset,
  fileScale
) => {
  const treemap = d3.tree().size([width, height]);

  const hierarchyData = d3.hierarchy(directory.mapToD3());

  const treeData = treemap(hierarchyData);

  // adds the nodes
  const nodes = createFileRectangles(
    svgGroup,
    treeData.descendants(),
    label,
    xOffset,
    yOffset,
    delayOffset,
    rectangleDimensions.width * fileScale,
    rectangleDimensions.height * fileScale,
    0.9 * fileScale + "rem"
  );

  const links = createFileLinks(
    svgGroup,
    treeData.descendants(),
    label,
    xOffset,
    yOffset,
    delayOffset
  );
};

const createFileRectangles = (
  svgGroup,
  data,
  label,
  xOffset,
  yOffset,
  delayOffset,
  width,
  height,
  fontSize
) =>
  svgGroup
    .selectAll(".node-" + label)
    .data(data, function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + (d.x + xOffset) + "," + (d.y + yOffset) + ")";
          })
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6);

        nodes
          .append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("x", -width / 2)
          .attr("y", -height / 2)
          .style("fill", (d) => {
            return d.data.isDirectory
              ? colors.directory.background
              : colors.file.background;
          })
          .attr("stroke", "black")
          .attr("rx", 5)
          .attr("ry", 5);

        nodes
          .append("text")
          .attr("dy", ".35em")
          .attr("font-size", fontSize)
          .style("fill", (d) => {
            return d.data.isDirectory
              ? colors.directory.text
              : colors.file.text;
          })
          .style("text-anchor", "middle")
          .text(function (d) {
            return d.data.name;
          });

        nodes
          .transition()
          .duration(durations.nodes.enter)
          .delay(delays.nodes.enter + delayOffset)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1);

        return nodes;
      },
      function (update) {
        return update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return "translate(" + (d.x + xOffset) + "," + (d.y + yOffset) + ")";
          });
      },
      function (exit) {
        return exit
          .transition()
          .duration(durations.nodes.exit)
          .delay(delays.nodes.exit + delayOffset)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );

const createFileLinks = (
  svgGroup,
  data,
  label,
  xOffset,
  yOffset,
  delayOffset
) =>
  svgGroup
    .selectAll(".link-" + label)
    .data(data.slice(1), function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("path")
          .lower()
          .attr("class", "link")
          .attr("d", function (d) {
            return `M ${d.x + xOffset} , ${d.y + yOffset} 
                      V ${(d.y + d.parent.y) / 2 + yOffset} 
                      H ${d.parent.x + xOffset} 
                      V ${d.parent.y + yOffset}`;
          })
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .transition()
          .delay(delays.paths.enter + delayOffset)
          .duration(durations.paths.enter)
          .attr("stroke-dashoffset", 0);

        return nodes;
      },
      function (update) {
        return update
          .transition()
          .duration(durations.paths.update)
          .delay(delays.paths.update + delayOffset)
          .attr("d", function (d) {
            return `M ${d.x + xOffset} , ${d.y + yOffset} 
                    V ${(d.y + d.parent.y) / 2 + yOffset} 
                    H ${d.parent.x + xOffset} 
                    V ${d.parent.y + yOffset}`;
          })
          .each(function (d) {
            d.totalLength = 1000;
          })
          .attr("stroke-dasharray", (d) => {
            return d.totalLength + " " + d.totalLength;
          })
          .attr("stroke-dashoffset", 0);
      },
      function (exit) {
        return exit
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", 0)
          .attr("stroke-dashoffset", 0)
          .transition()
          .delay(delays.paths.exit + delayOffset)
          .duration(3000)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .remove();
      }
    );

const createCommitTree = (
  svgGroup,
  initialCommit,
  label,
  width,
  height,
  xOffset,
  yOffset,
  delayOffset,
  radius
) => {
  const treemap = d3.tree().size([height, width]);

  const hierarchyData = d3.hierarchy(initialCommit);

  const treeData = treemap(hierarchyData);

  createCommitCircles(
    svgGroup,
    treeData.descendants(),
    label,
    xOffset,
    yOffset + radius * 2,
    delayOffset,
    radius
  );

  createCommitLinks(
    svgGroup,
    treeData.descendants(),
    label,
    xOffset,
    yOffset + radius * 2,
    delayOffset
  );
};

const createCommitCircles = (
  svgGroup,
  data,
  label,
  xOffset,
  yOffset,
  delayOffset,
  radius
) =>
  svgGroup
    .selectAll(".node-" + label)
    .data(data, function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + (d.y + xOffset) + "," + (d.x + yOffset) + ")";
          })
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6);

        nodes
          .append("circle")
          .attr("r", radius)
          .attr("x", -radius)
          .attr("y", -radius)
          .style("fill", (d) => {
            return d.data.isDirectory
              ? colors.directory.background
              : colors.file.background;
          })
          .attr("stroke", "black");

        nodes
          .transition()
          .duration(durations.nodes.enter)
          .delay(delays.nodes.enter + delayOffset)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1);

        return nodes;
      },
      function (update) {
        return update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return "translate(" + (d.y + xOffset) + "," + (d.x + yOffset) + ")";
          });
      },
      function (exit) {
        return exit
          .transition()
          .duration(durations.nodes.exit)
          .delay(delays.nodes.exit + delayOffset)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );

const createCommitLinks = (
  svgGroup,
  data,
  label,
  xOffset,
  yOffset,
  delayOffset
) =>
  svgGroup
    .selectAll(".link-" + label)
    .data(data.slice(1), function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("path")
          .lower()
          .attr("class", "link")
          .attr("d", function (d) {
            return `M ${d.y + xOffset} , ${d.x + yOffset} 
                    L ${d.parent.y + xOffset}, ${d.parent.x + yOffset}`;
          })
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .transition()
          .delay(delays.paths.enter + delayOffset)
          .duration(durations.paths.enter)
          .attr("stroke-dashoffset", 0);

        return nodes;
      },
      function (update) {
        return update
          .transition()
          .duration(durations.paths.update)
          .delay(delays.paths.update + delayOffset)
          .attr("d", function (d) {
            return `M ${d.y + xOffset} , ${d.x + yOffset} 
                    L ${d.parent.y + xOffset}, ${d.parent.x + yOffset}`;
          })
          .each(function (d) {
            d.totalLength = 1000;
          })
          .attr("stroke-dasharray", (d) => {
            return d.totalLength + " " + d.totalLength;
          })
          .attr("stroke-dashoffset", 0);
      },
      function (exit) {
        return exit
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", 0)
          .attr("stroke-dashoffset", 0)
          .transition()
          .delay(delays.paths.exit + delayOffset)
          .duration(3000)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .remove();
      }
    );

const mapDirToD3 = (dir, x) => {
  const files = dir.contents
    .filter((content) => content instanceof File)
    .map((content, i) => ({
      x: x,
      y: i * (rectangleDimensions.height + 4),
      data: content,
    }));

  const dirs = dir.contents
    .filter((content) => content instanceof Directory)
    .map((content, i) => ({
      x: x + rectangleDimensions.width + 10,
      y: i * (rectangleDimensions.height + 4),
      data: { ...content, isDirectory: true },
    }));

  return [...files, ...dirs];
};

export {
  renderFileStructureVisualization,
  updateFileStructureVisualization,
  renderGitVisualization,
  highlightNode,
  colorNode,
  colors,
  delays,
};
