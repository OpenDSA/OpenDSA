import { Directory, File } from "./fileSystemEntity.js";
import { GIT_STATE } from "./gitStatuses.js";

const margin = { top: 30, right: 90, bottom: 30, left: 90 };

const rectangleDimensions = { width: 76, height: 30 };
const circleRadius = 15;

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

const gitColors = {
  [GIT_STATE.ADDED]: { background: "#1fd665" },
  [GIT_STATE.CHANGED]: { background: "#ff6863" },
};

function renderFileStructureVisualization(data, currDirId, width, height, id) {
  const svgData = renderSVG(width, height, id);
  updateFileStructureVisualization(
    svgData,
    data,
    -1 * delays.nodes.enter,
    currDirId
  );
  colorNode(svgData.group, currDirId, colors.current.background, "");

  return svgData;
}

function renderGitVisualization(localHomeDir, gitMethods, width, height, id) {
  const svgData = renderSVG(width, height, id);
  updateGitVisualization(
    svgData,
    localHomeDir,
    -1 * delays.paths.update,
    null,
    gitMethods
  );

  return svgData;
}

function renderSVG(width, height, id) {
  const svgWidth = width - margin.left - margin.right;
  const svgHeight = height - margin.top - margin.bottom;

  const svg = d3
    .select(id)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const svgGroup = svg.append("g");
  // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  return { group: svgGroup, width: width, height: height };
}

function selectNode(svgGroup, id, label) {
  return svgGroup.selectAll(".node-" + label).filter(function (d) {
    return d.data.id === id;
  });
}

function colorNode(svgGroup, id, color, label) {
  selectNode(svgGroup, id, label)
    .select("rect")
    .transition()
    .duration(1000)
    .style("fill", color);
}

function highlightNode(svgGroup, id, color, prevColor, prevText) {
  const node = selectNode(svgGroup, id, "");
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

function updateFileStructureVisualization(
  svgData,
  homeDir,
  delayOffset,
  currDirId
) {
  const svgGroup = svgData.group;

  createFileTree(
    svgGroup,
    homeDir,
    currDirId,
    false,
    "",
    svgData.width,
    svgData.height,
    0,
    0,
    delayOffset,
    1,
    5,
    5
  );
}

function updateGitVisualization(
  svgData,
  localHomeDir,
  delayOffset,
  currDirId,
  gitMethods
) {
  const { group, width, height } = svgData;

  createVerticalLine(group, width / 2, height);

  createText(group, "Local", 2, 10, 1);

  createText(group, "Remote", width / 2 + 4, 10, 1);

  createFileTree(
    group,
    localHomeDir,
    null,
    true,
    "local",
    width / 2,
    height / 2,
    0,
    0,
    delayOffset,
    0.7,
    5,
    5
  );

  createFileTree(
    group,
    gitMethods.getRemoteHomeDir(),
    null,
    true,
    "remote",
    width / 2,
    height / 2,
    width / 2,
    0,
    delayOffset,
    0.7,
    5,
    5
  );

  if (gitMethods.getLocalInitialCommit()) {
    createCommitTree(
      group,
      gitMethods.getLocalInitialCommit(),
      gitMethods.getLocalCurrBranch(),
      "local-commit",
      width / 2,
      height / 2,
      0,
      height / 2,
      delayOffset,
      circleRadius,
      0.7,
      5,
      5
    );
  }

  createCommitTree(
    group,
    gitMethods.getRemoteInitialCommit(),
    gitMethods.getRemoteCurrBranch(),
    "remote-commit",
    width / 2,
    height / 2,
    width / 2,
    height / 2,
    delayOffset,
    circleRadius,
    0.7,
    5,
    5
  );
}

const createFileTree = (
  svgGroup,
  directory,
  currDirId,
  colorGit,
  label,
  width,
  height,
  x,
  y,
  delayOffset,
  fileScale,
  paddingX,
  paddingY
) => {
  const rectangleWidth = rectangleDimensions.width * fileScale;
  const rectangleHeight = rectangleDimensions.height * fileScale;
  const adjustedWidth = width - rectangleWidth - 2 * paddingX;
  const adjustedHeight = height - rectangleHeight - 2 * paddingY;
  const xOffset = rectangleWidth / 2 + x + paddingX;
  const yOffset = rectangleHeight / 2 + y + paddingY;

  const treemap = d3.tree().size([adjustedWidth, adjustedHeight]);

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
    rectangleWidth,
    rectangleHeight,
    0.9 * fileScale + "rem",
    currDirId,
    colorGit
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
  x,
  y,
  delayOffset,
  width,
  height,
  fontSize,
  currDirId,
  colorGit
) => {
  const xOffset = x;
  const yOffset = y;
  return svgGroup
    .selectAll(".node-" + label)
    .data(data, function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "node-" + label)
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
            return getFileColor(
              d.data.id,
              currDirId,
              d.data.gitState,
              d.data.isDirectory,
              colorGit
            );
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
        const node = update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return "translate(" + (d.x + xOffset) + "," + (d.y + yOffset) + ")";
          });

        node.select("rect").style("fill", (d) => {
          return getFileColor(
            d.data.id,
            currDirId,
            d.data.gitState,
            d.data.isDirectory,
            colorGit
          );
        });
        // node.select("text").style("fill", colors.directory.text);

        return node;
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
};

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
          .attr("class", "link-" + label)
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
  currBranch,
  label,
  width,
  height,
  x,
  y,
  delayOffset,
  radius,
  rectangleScale,
  paddingX,
  paddingY
) => {
  const rectangleWidth = rectangleDimensions.width * rectangleScale;
  const rectangleHeight = rectangleDimensions.height * rectangleScale;
  const adjustedWidth = width - rectangleWidth - 2 * paddingX;
  const adjustedHeight = height - rectangleHeight - 2 * paddingY;

  const xOffset = x + rectangleWidth / 2 + paddingX;
  const yOffset = y + paddingY;
  //todo figure out height
  const treemap = d3.tree().size([adjustedHeight, adjustedWidth]);

  const hierarchyData = d3.hierarchy(initialCommit);

  const treeData = treemap(hierarchyData);

  const descendants = treeData.descendants();

  const currGap =
    descendants.length > 1 ? descendants[1].y - descendants[0].y : null;

  const desiredGap = 100;

  const useDesiredGap = currGap === null || desiredGap < currGap;

  const data = descendants.map((commit) => ({
    ...commit,
    x: useDesiredGap ? commit.depth * desiredGap : commit.y,
    y: commit.x,
    parent: commit.parent
      ? {
          ...commit.parent,
          x: useDesiredGap ? commit.parent.depth * desiredGap : commit.parent.y,
          y: commit.parent.x,
        }
      : null,
  }));

  const headCommitId = currBranch.commit.id;

  createCommitCircles(
    svgGroup,
    data,
    label,
    xOffset,
    yOffset,
    delayOffset,
    radius,
    headCommitId
  );

  createCommitLinks(svgGroup, data, label, xOffset, yOffset, delayOffset);

  const branches = data.flatMap((commit) =>
    commit.data.branches.map((branch, index) => ({
      ...branch,
      x: commit.x,
      y: commit.y,
      index: index,
    }))
  );

  createBranchRectangles(
    svgGroup,
    branches,
    label,
    xOffset,
    yOffset,
    delayOffset + durations.nodes.update,
    rectangleWidth,
    rectangleHeight,
    "0.7rem",
    radius,
    currBranch.id
  );
};

const createCommitCircles = (
  svgGroup,
  data,
  label,
  xOffset,
  yOffset,
  delayOffset,
  radius,
  headCommitId
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
          .attr("class", "node-" + label)
          .attr("transform", function (d) {
            return "translate(" + (d.x + xOffset) + "," + (d.y + yOffset) + ")";
          })
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6);

        nodes
          .append("circle")
          .attr("r", radius)
          .attr("x", -radius)
          .attr("y", -radius)
          .style("fill", (d) => {
            return d.data.id === headCommitId
              ? "purple"
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
            return "translate(" + (d.x + xOffset) + "," + (d.y + yOffset) + ")";
          })
          .select("circle")
          .style("fill", (d) => {
            return d.data.id === headCommitId
              ? "purple"
              : colors.file.background;
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

      // .selectAll("node-test-" + label)
      // .data(
      //   (d) => {
      //     const branches = d.data.branches.map((branch, index) => ({
      //       ...branch,
      //       // x: d.x,
      //       // y: d.y + 20 * index,

      //       index: index,
      //     }));
      //     return branches;
      //   },
      //   (d) => {
      //     return d.id;
      //   }
      // )
      // .join(
      //   function (enter) {
      //     console.log("enter branch");
      //     const nodes = enter
      //       .append("g")
      //       .attr("class", "node-test-" + label)
      //       .attr("transform", function (d) {
      //         console.log("d bracnh", d);
      //         return "translate(" + 0 + "," + 0 + ")";
      //       })
      //       .style("fill-opacity", 1e-6)
      //       .style("stroke-opacity", 1e-6);

      //     nodes
      //       .append("rect")
      //       .attr("width", 50)
      //       .attr("height", 20)
      //       .attr("x", -25)
      //       .attr("y", radius)
      //       .style("fill", (d) => {
      //         return colors.directory.background;
      //       })
      //       .attr("stroke", "black")
      //       .attr("rx", 5)
      //       .attr("ry", 5);

      //     nodes
      //       .append("text")
      //       .attr("y", radius + 10)
      //       .attr("dy", ".35em")
      //       .attr("font-size", "0.7rem")
      //       .style("fill", (d) => {
      //         return colors.directory.text;
      //       })
      //       .style("text-anchor", "middle")
      //       .text(function (d) {
      //         return d.name;
      //       });

      //     nodes
      //       .transition()
      //       .duration(durations.nodes.enter)
      //       .delay(delays.nodes.enter + delayOffset)
      //       .style("fill-opacity", 1)
      //       .style("stroke-opacity", 1);

      //     return nodes;
      //   },
      //   function (update) {
      //     const node = update
      //       .attr("y", 0)
      //       .style("fill-opacity", 1)
      //       .style("stroke-opacity", 1)
      //       .transition()
      //       .duration(durations.nodes.update)
      //       .delay(delays.nodes.update + delayOffset)
      //       .attr("transform", function (d) {
      //         return "translate(" + (d.x + xOffset) + "," + (d.y + yOffset) + ")";
      //       });

      //     node.select("rect").style("fill", (d) => {
      //       return getFileColor(d.data.gitState, d.data.isDirectory);
      //     });
      //     // node.select("text").style("fill", colors.directory.text);

      //     return node;
      //   },
      //   function (exit) {
      //     return exit
      //       .transition()
      //       .duration(durations.nodes.exit)
      //       .delay(delays.nodes.exit + delayOffset)
      //       .style("fill-opacity", 1e-6)
      //       .style("stroke-opacity", 1e-6)
      //       .remove();
      //   }
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
          .attr("class", "link-" + label)
          .attr("d", function (d) {
            return `M ${d.x + xOffset} , ${d.y + yOffset} 
                    L ${d.parent.x + xOffset}, ${d.parent.y + yOffset}`;
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
                    L ${d.parent.x + xOffset}, ${d.parent.y + yOffset}`;
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

const createBranchRectangles = (
  svgGroup,
  data,
  label,
  xOffset,
  yOffset,
  delayOffset,
  width,
  height,
  fontSize,
  radius,
  currBranchId
) =>
  svgGroup
    .selectAll(".branch-" + label)
    .data(data, function (d) {
      return d.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "branch-" + label)
          .attr("transform", function (d) {
            return (
              "translate(" +
              (d.x + xOffset) +
              "," +
              (d.y + yOffset + 2 * radius + d.index * height) +
              ")"
            );
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
            return d.id === currBranchId
              ? "purple"
              : colors.directory.background;
          })
          .attr("stroke", "black")
          .attr("rx", 5)
          .attr("ry", 5);

        nodes
          .append("text")
          .attr("dy", ".35em")
          .attr("font-size", fontSize)
          .style("fill", (d) => {
            return colors.directory.text;
          })
          .style("text-anchor", "middle")
          .text(function (d) {
            return d.name;
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
        const node = update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return (
              "translate(" +
              (d.x + xOffset) +
              "," +
              (d.y + yOffset + 2 * radius + d.index * height) +
              ")"
            );
          });

        node.select("rect").style("fill", (d) => {
          return d.id === currBranchId ? "purple" : colors.directory.background;
        });

        return node;
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

const createText = (svgGroup, text, x, y, fontSize) =>
  svgGroup
    .append("text")
    .attr("dy", ".35em")
    .attr("x", x)
    .attr("y", y)
    .attr("font-size", fontSize + "rem")
    .text(text);

const createVerticalLine = (svgGroup, x, length) =>
  svgGroup
    .append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return `M ${x} , ${0} 
          V ${x} , ${length}
          `;
    });

const getFileColor = (id, currDirId, gitState, isDirectory, colorGit) => {
  if (currDirId === id) {
    return colors.current.background;
  }
  if (isDirectory) {
    return colors.directory.background;
  }
  if (colorGit) {
    const color = gitColors[gitState];
    if (color) {
      return color.background;
    }
  }
  return colors.file.background;
};

export {
  renderFileStructureVisualization,
  updateFileStructureVisualization,
  renderGitVisualization,
  updateGitVisualization,
  highlightNode,
  colorNode,
  colors,
  delays,
};
