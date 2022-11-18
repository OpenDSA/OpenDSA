import { Directory } from "../classes/file-system-entity.js";
import { FILE_STATE } from "../config/file-states.js";
import {
  getTimings,
  INITIALIZE_FILE_TREE_OFFSETS,
  INITIALIZE_OFFSETS,
} from "../config/timing-offsets.js";

const margin = { top: 30, right: 90, bottom: 30, left: 90 };

const rectangleDimensions = { width: 76, height: 30 };
const circleRadius = 21;
const defaultFontSize = 0.9;

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
  highlight: { background: "orange", text: "black" },
};

function renderFileStructureVisualization(homeDir, currDir, width, height, id) {
  const svgData = renderSVG(width, height, id);
  updateFileStructureVisualization(
    svgData,
    homeDir,
    currDir,
    INITIALIZE_FILE_TREE_OFFSETS
  );

  return svgData;
}

function renderGitVisualization(
  localHomeDir,
  localCurrDir,
  gitMethods,
  width,
  height,
  id
) {
  const svgData = renderSVG(width, height, id);
  updateGitVisualization(
    svgData,
    localHomeDir,
    localCurrDir,
    INITIALIZE_OFFSETS,
    null,
    gitMethods
  );

  createVerticalLine(svgData.group, svgData.width / 2, svgData.height);
  createText(svgData.group, "Local", 2, 10, 1);
  createText(svgData.group, "Remote", svgData.width / 2 + 4, 10, 1);

  return svgData;
}

function initializeGitVisualization(svgData) {
  const { group, width, height } = svgData;

  createVerticalLine(group, width / 2, height);
  createText(group, "Local", 5, 12, 1);
  createText(group, "Remote", width / 2 + 7, 12, 1);
}

function renderSVG(width, height, id) {
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

function highlightNode(svgGroup, id, label) {
  const node = selectNode(svgGroup, id, label ? label : "");
  const rect = node.select("rect");
  const text = node.select("text");

  const rectColor = rect.style("fill");
  const textColor = text.style("fill");

  rect
    .transition()
    .duration(1000)
    .style("fill", colors.highlight.background)
    .transition()
    .duration(1000)
    .delay(3000)
    .style("fill", rectColor);
  text
    .transition()
    .duration(1000)
    .style("fill", colors.highlight.text)
    .transition()
    .duration(1000)
    .delay(3000)
    .style("fill", textColor);
}

function highlightFiles(svgGroup, files, label) {
  files.forEach((file) => {
    highlightNode(svgGroup, file.id, label);
  });
}

function updateFileStructureVisualization(
  svgData,
  state,
  offsets,
  extraVisualizations
) {
  const { homeDir, currDir } = state;
  const svgGroup = svgData.group;

  if (extraVisualizations && extraVisualizations.highlight) {
    highlightFiles(svgGroup, extraVisualizations.highlight);
  } else {
    const timings = getTimings(offsets);

    const data = createFileTreeData(
      homeDir,
      0,
      0,
      svgData.width,
      svgData.height,
      20,
      20,
      1
    );

    createFileTree(
      svgGroup,
      data,
      currDir?.id,
      false,
      "",
      1,
      timings.local.fileTree
    );
  }
}

function updateGitVisualization(svgData, state, offsets, extraVisualizations) {
  const { group, width, height } = svgData;
  const {
    homeDir,
    currDir,
    localInitialCommit,
    localCurrBranch,
    remoteHomeDir,
    remoteInitialCommit,
    remoteCurrBranch,
  } = state;

  if (extraVisualizations && extraVisualizations.highlight) {
    highlightFiles(group, extraVisualizations.highlight, "local");
  } else {
    const scale = 0.7;
    const padding = 5;
    const timings = getTimings(offsets);

    let {
      localFileTreeData,
      remoteFileTreeData,
      localCommitTreeData,
      remoteCommitTreeData,
      localBranchData,
      remoteBranchData,
    } = createGitVisualizationData(
      homeDir,
      remoteHomeDir,
      localInitialCommit,
      remoteInitialCommit,
      localCurrBranch,
      remoteCurrBranch,
      width,
      height,
      padding,
      scale
    );

    if (extraVisualizations) {
      if (extraVisualizations.commit) {
        visualizeCommit(
          group,
          extraVisualizations.commit,
          localFileTreeData,
          localCommitTreeData,
          timings.commit
        );
      }

      if (extraVisualizations.push) {
        ({ remoteFileTreeData, remoteCommitTreeData, remoteBranchData } =
          visualizePush(
            localFileTreeData,
            remoteFileTreeData,
            localCommitTreeData,
            remoteCommitTreeData,
            localBranchData,
            remoteBranchData,
            extraVisualizations.push,
            group,
            0.7,
            timings.push
          ));
      }

      if (extraVisualizations.clone) {
        ({ localFileTreeData, localCommitTreeData, localBranchData } =
          visualizeClone(
            localFileTreeData,
            remoteFileTreeData,
            localCommitTreeData,
            remoteCommitTreeData,
            localBranchData,
            remoteBranchData
          ));
      }

      if (extraVisualizations.pull) {
        ({ localFileTreeData, localCommitTreeData, localBranchData } =
          visualizePull(
            localFileTreeData,
            remoteFileTreeData,
            localCommitTreeData,
            remoteCommitTreeData,
            localBranchData,
            remoteBranchData,
            extraVisualizations.pull,
            group,
            0.7,
            timings.pull
          ));
      }
    }

    createGitVisualization(
      localFileTreeData,
      remoteFileTreeData,
      localCommitTreeData,
      remoteCommitTreeData,
      localBranchData,
      remoteBranchData,
      group,
      scale,
      currDir?.id,
      timings
    );
  }
}

const createFileTree = (
  svgGroup,
  data,
  currDirId,
  colorGit,
  label,
  fileScale,
  timings
) => {
  createFileRectangles(
    svgGroup,
    data,
    label,
    rectangleDimensions.width * fileScale,
    rectangleDimensions.height * fileScale,
    defaultFontSize * fileScale + "rem",
    currDirId,
    colorGit,
    timings.fileRectangles
  );

  createFileLinks(svgGroup, data, label, timings.fileLinks);
};

const createFileRectangles = (
  svgGroup,
  data,
  label,
  width,
  height,
  fontSize,
  currDirId,
  colorGit,
  timings
) => {
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
            return (
              "translate(" +
              (d.startX ? d.startX : d.x) +
              "," +
              (d.startY ? d.startY : d.y) +
              ")"
            );
          })
          .style("fill-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          })
          .style("stroke-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          });

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
              d.data.isChanged,
              d.data.isStaged,
              d.data.isDirectory,
              colorGit
            );
          })
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("stroke", "black");

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
          .duration(timings.durations.enter)
          .delay(timings.delays.enter)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        return nodes;
      },
      function (update) {
        const node = update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(timings.durations.update)
          .delay(timings.delays.update)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        node.select("rect").style("fill", (d) => {
          return getFileColor(
            d.data.id,
            currDirId,
            d.data.isChanged,
            d.data.isStaged,
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
          .duration(timings.durations.exit)
          .delay(timings.delays.exit)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );
};

const createFileLinks = (svgGroup, data, label, timings) =>
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
          .attr("stroke", "#ccc")
          .attr("stroke-width", "2px")
          .attr("fill", "none")
          .transition()
          .delay(timings.delays.enter)
          .duration(timings.durations.enter)
          .attr("stroke-dashoffset", 0);

        return nodes;
      },
      function (update) {
        return update
          .transition()
          .duration(timings.durations.update)
          .delay(timings.delays.update)
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
          .delay(timings.delays.exit)
          .duration(timings.durations.exit)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .remove();
      }
    );

const createCommitTree = (svgGroup, data, branches, label, scale, timings) => {
  createCommitCircles(
    svgGroup,
    data,
    label,
    circleRadius * scale,
    timings.commitCircles
  );

  createCommitLinks(svgGroup, data, label, timings.commitLinks);

  createBranchRectangles(
    svgGroup,
    branches,
    label,
    rectangleDimensions.width * scale,
    rectangleDimensions.height * scale,
    defaultFontSize * scale + "rem",
    timings.branchRectangles
  );
};

const createCommitCircles = (svgGroup, data, label, radius, timings) =>
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
            return (
              "translate(" +
              (d.startX ? d.startX : d.x) +
              "," +
              (d.startY ? d.startY : d.y) +
              ")"
            );
          })
          .style("fill-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          })
          .style("stroke-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          });

        nodes
          .append("circle")
          .attr("r", radius)
          .attr("x", -radius)
          .attr("y", -radius)
          .style("fill", (d) => {
            return d.isHead ? "purple" : colors.file.background;
          })
          .attr("stroke", "black");

        nodes
          .append("text")
          .attr("dy", ".35em")
          .attr("font-size", "0.8rem")
          .style("fill", (d) => {
            return d.isHead ? "white" : "black";
          })
          .style("text-anchor", "middle")
          .text(function (d) {
            return d.number;
          });

        nodes
          .transition()
          .duration(timings.durations.enter)
          .delay(timings.delays.enter)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
        return nodes;
      },
      function (update) {
        const node = update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(timings.durations.update)
          .delay(timings.delays.update)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        node.select("circle").style("fill", (d) => {
          return d.isHead ? "purple" : colors.file.background;
        });

        node.select("text").style("fill", (d) => {
          return d.isHead ? "white" : "black";
        });

        return node;
      },
      function (exit) {
        return exit
          .transition()
          .duration(timings.durations.exit)
          .delay(timings.delays.exit)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );

const createCommitLinks = (svgGroup, data, label, timings) =>
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
            return `M ${d.x} , ${d.y} 
                    L ${d.parent.x}, ${d.parent.y}`;
          })
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .attr("stroke", "#ccc")
          .attr("stroke-width", "2px")
          .attr("fill", "none")
          .transition()
          .delay(timings.delays.enter)
          .duration(timings.durations.enter)
          .attr("stroke-dashoffset", 0);

        return nodes;
      },
      function (update) {
        return update
          .transition()
          .duration(timings.durations.update)
          .delay(timings.delays.update)
          .attr("d", function (d) {
            return `M ${d.x} , ${d.y} 
                    L ${d.parent.x}, ${d.parent.y}`;
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
          .delay(timings.delays.exit)
          .duration(timings.durations.exit)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .remove();
      }
    );

const createBranchRectangles = (
  svgGroup,
  data,
  label,
  width,
  height,
  fontSize,
  timings
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
              (d.startX ? d.startX : d.x) +
              "," +
              (d.startY ? d.startY : d.y) +
              ")"
            );
          })
          .style("fill-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          })
          .style("stroke-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          });

        nodes
          .append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("x", -width / 2)
          .attr("y", -height / 2)
          .style("fill", (d) => {
            return d.isCurrBranch ? "purple" : colors.directory.background;
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
          .duration(timings.durations.enter)
          .delay(timings.delays.enter)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        return nodes;
      },
      function (update) {
        const node = update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(timings.durations.update)
          .delay(timings.delays.update)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        node.select("rect").style("fill", (d) => {
          return d.isCurrBranch ? "purple" : colors.directory.background;
        });

        return node;
      },
      function (exit) {
        return exit
          .transition()
          .duration(timings.durations.exit)
          .delay(timings.delays.exit)
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
    .attr("d", function (d) {
      return `M ${x} , ${0} 
          V ${x} , ${length}
          `;
    })
    .style("fill", "none")
    .style("stroke", "black")
    .style("stoke-width", "4px");

const getFileColor = (
  id,
  currDirId,
  isChanged,
  isStaged,
  isDirectory,
  colorGit
) => {
  if (currDirId === id) {
    return colorGit ? "purple" : colors.current.background;
  }
  if (isDirectory) {
    return colors.directory.background;
  }
  if (colorGit) {
    if (isStaged) {
      return "#1fd665";
    }
    if (isChanged) {
      return "#ff6863";
    }
  }
  return colors.file.background;
};

const createCommitTreeData = (
  initialCommit,
  currBranch,
  x,
  y,
  width,
  height,
  paddingX,
  paddingY,
  scale
) => {
  const rectangleWidth = rectangleDimensions.width * scale;
  const rectangleHeight = rectangleDimensions.height * scale;
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

  return descendants.map((commit) => ({
    ...commit,
    x: (useDesiredGap ? commit.depth * desiredGap : commit.y) + xOffset,
    y: commit.x + yOffset,
    isHead: currBranch.commit.id === commit.data.id,
    parent: commit.parent
      ? {
          ...commit.parent,
          x:
            (useDesiredGap
              ? commit.parent.depth * desiredGap
              : commit.parent.y) + xOffset,
          y: commit.parent.x + yOffset,
        }
      : null,
  }));
};

const createBranchData = (commits, currBranchId, scale) =>
  commits.flatMap((commit) =>
    commit.data.branches.map((branch, index) => ({
      ...branch,
      x: commit.x,
      y:
        commit.y +
        2 * circleRadius * scale +
        index * rectangleDimensions.height * scale,
      index: index,
      isCurrBranch: branch.id === currBranchId,
    }))
  );

const createFileTreeData = (
  directory,
  x,
  y,
  width,
  height,
  paddingX,
  paddingY,
  scale
) => {
  const rectangleWidth = rectangleDimensions.width * scale;
  const rectangleHeight = rectangleDimensions.height * scale;
  const adjustedWidth = width - rectangleWidth - 2 * paddingX;
  const adjustedHeight = height - rectangleHeight - 2 * paddingY;
  const xOffset = rectangleWidth / 2 + x + paddingX;
  const yOffset = rectangleHeight / 2 + y + paddingY;

  const treemap = d3.tree().size([adjustedWidth, adjustedHeight]);

  const hierarchyData = d3.hierarchy(directory.mapToD3());

  const treeData = treemap(hierarchyData);

  const descendants = treeData.descendants();

  return descendants.map((file) => ({
    ...file,
    x: file.x + xOffset,
    y: file.y + yOffset,
    parent: file.parent
      ? {
          ...file.parent,
          x: file.parent.x + xOffset,
          y: file.parent.y + yOffset,
        }
      : null,
  }));
};

const createGitVisualizationData = (
  localHomeDir,
  remoteHomeDir,
  localInitialCommit,
  remoteInitialCommit,
  localCurrBranch,
  remoteCurrBranch,
  width,
  height,
  padding,
  scale
) => {
  const localFileTreeData = localHomeDir
    ? createFileTreeData(
        localHomeDir,
        0,
        0,
        width / 2,
        height / 2,
        padding,
        padding,
        scale
      )
    : [];

  const remoteFileTreeData = createFileTreeData(
    remoteHomeDir,
    width / 2,
    0,
    width / 2,
    height / 2,
    padding,
    padding,
    scale
  );

  let localCommitTreeData = localInitialCommit
    ? createCommitTreeData(
        localInitialCommit,
        localCurrBranch,
        0,
        height / 2,
        width / 2,
        height / 2,
        padding,
        padding,
        scale
      )
    : [];

  let remoteCommitTreeData = createCommitTreeData(
    remoteInitialCommit,
    remoteCurrBranch,
    width / 2,
    height / 2,
    width / 2,
    height / 2,
    padding,
    padding,
    scale
  );

  ({ localCommitTreeData, remoteCommitTreeData } = updateCommitIds(
    localCommitTreeData,
    remoteCommitTreeData
  ));

  const localBranchData = localInitialCommit
    ? createBranchData(localCommitTreeData, localCurrBranch.id, scale)
    : [];

  const remoteBranchData = createBranchData(
    remoteCommitTreeData,
    remoteCurrBranch.id,
    scale
  );

  return {
    localFileTreeData,
    remoteFileTreeData,
    localCommitTreeData,
    remoteCommitTreeData,
    localBranchData,
    remoteBranchData,
  };
};

const createGitVisualization = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData,
  svgGroup,
  scale,
  currDirId,
  timings
) => {
  createFileTree(
    svgGroup,
    localFileTreeData,
    currDirId,
    true,
    "local",
    scale,
    timings.local.fileTree
  );

  createFileTree(
    svgGroup,
    remoteFileTreeData,
    null,
    true,
    "remote",
    scale,
    timings.remote.fileTree
  );

  createCommitTree(
    svgGroup,
    localCommitTreeData,
    localBranchData,
    "local-commit",
    scale,
    timings.local.commitTree
  );

  createCommitTree(
    svgGroup,
    remoteCommitTreeData,
    remoteBranchData,
    "remote-commit",
    scale,
    timings.remote.commitTree
  );
};

function visualizeCommit(
  svgGroup,
  commit,
  fileTreeData,
  commitTreeData,
  timings
) {
  //create a rectangle for each file
  //transition from filetreedata location to committreedatalocation
  const rectangleWidth = 0.7 * rectangleDimensions.width;
  const rectangleHeight = 0.7 * rectangleDimensions.height;

  const existingCommit = commitTreeData.find(
    (value) => value.data.gitId === commit.gitId
  );

  const files = commit.files.flatMap((file) => file.flatten());

  //TODO maybe add animation for deleted
  const filesData = files
    .filter((file) => !file.isStagingState(FILE_STATE.DELETED))
    .map((file) => {
      const existingFile = fileTreeData.find(
        (value) => value.data.gitId === file.gitId
      );
      return {
        ...file,
        startX: existingFile.x,
        startY: existingFile.y,
        endX: existingCommit.x,
        endY: existingCommit.y,
        isDirectory: file instanceof Directory,
      };
    });

  return showFilesMoving(
    svgGroup,
    filesData,
    0.7,
    "commit-files",
    timings,
    true
  );
}

const showFilesMoving = (
  svgGroup,
  files,
  scale,
  className,
  timings,
  fadeOut
) => {
  const rectangleWidth = rectangleDimensions.width * scale;
  const rectangleHeight = rectangleDimensions.height * scale;
  return svgGroup
    .selectAll("." + className)
    .data(files, function (d) {
      return d.id;
    })
    .join(function (enter) {
      const nodes = enter
        .append("g")
        .attr("class", className)
        .attr("transform", function (d) {
          return "translate(" + d.startX + "," + d.startY + ")";
        })
        .style("fill-opacity", function (d) {
          return 1e-6;
        })
        .style("stroke-opacity", function (d) {
          return 1e-6;
        });

      nodes
        .append("rect")
        .attr("width", rectangleWidth)
        .attr("height", rectangleHeight)
        .attr("x", -rectangleWidth / 2)
        .attr("y", -rectangleHeight / 2)
        .style("fill", (d) => {
          return d.isDirectory
            ? colors.directory.background
            : colors.file.background;
        })
        .attr("stroke", "black")
        .attr("rx", 5)
        .attr("ry", 5);

      nodes
        .append("text")
        .attr("dy", ".35em")
        .attr("font-size", scale * defaultFontSize + "rem")
        .style("fill", (d) => {
          return d.isDirectory ? colors.directory.text : colors.file.text;
        })
        .style("text-anchor", "middle")
        .text(function (d) {
          return d.name;
        });

      nodes
        .transition()
        .duration(timings.durations.enter)
        .delay(timings.delays.enter)
        .style("fill-opacity", 1)
        .style("stroke-opacity", 1)
        .transition()
        .duration(timings.durations.moving)
        .delay(timings.delays.moving)
        .attr("transform", function (d) {
          return "translate(" + d.endX + "," + d.endY + ")";
        })
        .style("fill-opacity", fadeOut ? 1e-6 : 1)
        .style("stroke-opacity", fadeOut ? 1e-6 : 1)
        .remove();
      return nodes;
    });
};

const addLocation = (src, dst, idPath) =>
  dst.map((dstValue) => {
    const srcValue = src.find(
      (value) =>
        followPropertyPath(value, idPath) ===
        followPropertyPath(dstValue, idPath)
    );
    return {
      ...dstValue,
      startX: srcValue ? srcValue.x : null,
      startY: srcValue ? srcValue.y : null,
    };
  });

const followPropertyPath = (value, path) => {
  const pathSplit = path.split(".");
  let curr = value;
  pathSplit.forEach((name) => {
    curr = curr[name];
  });
  return curr;
};

const visualizePush = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData,
  push,
  svgGroup,
  scale,
  timings
) => {
  remoteCommitTreeData = addLocation(
    localCommitTreeData,
    remoteCommitTreeData,
    "data.gitId"
  );

  remoteBranchData = addLocation(localBranchData, remoteBranchData, "gitId");

  if (push.commitPath) {
    remoteFileTreeData = addLocation(
      localFileTreeData,
      remoteFileTreeData,
      "data.gitId"
    );

    visualizeModifiedFiles(
      localFileTreeData,
      remoteFileTreeData,
      push.commitPath,
      svgGroup,
      scale,
      delays.nodes.update + 1000,
      timings
    );
  }

  return { remoteFileTreeData, remoteBranchData, remoteCommitTreeData };
};

const visualizePull = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData,
  pull,
  svgGroup,
  scale,
  timings
) => {
  localCommitTreeData = addLocation(
    remoteCommitTreeData,
    localCommitTreeData,
    "data.gitId"
  );

  localBranchData = addLocation(remoteBranchData, localBranchData, "gitId");

  if (pull.commitPath) {
    localFileTreeData = addLocation(
      remoteFileTreeData,
      localFileTreeData,
      "data.gitId"
    );

    visualizeModifiedFiles(
      remoteFileTreeData,
      localFileTreeData,
      pull.commitPath,
      svgGroup,
      scale,
      delays.nodes.update + 1000,
      timings
    );
  }

  return { localFileTreeData, localBranchData, localCommitTreeData };
};

const visualizeModifiedFiles = (
  localFileTreeData,
  remoteFileTreeData,
  commitPath,
  svgGroup,
  scale,
  delay,
  timings
) => {
  const modifiedFiles = commitPath
    .filter((value) => value.action !== "nothing")
    .flatMap((value) => value.commit.files)
    .filter(
      (file) =>
        file.isStagingState(FILE_STATE.MODIFIED) &&
        remoteFileTreeData.find((value) => value.data.gitId === file.gitId)
    )
    .flatMap((file) => file.flatten())
    .map((file) => {
      const localFile = localFileTreeData.find(
        (value) => value.data.gitId === file.gitId
      );
      const remoteFile = remoteFileTreeData.find(
        (value) => value.data.gitId === file.gitId
      );
      return {
        ...file,
        startX: localFile.x,
        startY: localFile.y,
        endX: remoteFile.x,
        endY: remoteFile.y,
        isDirectory: file instanceof Directory,
      };
    });
  showFilesMoving(svgGroup, modifiedFiles, scale, "push-files", timings);
};

const visualizeClone = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData
) => {
  localCommitTreeData = addLocation(
    remoteCommitTreeData,
    localCommitTreeData,
    "data.gitId"
  );

  localBranchData = addLocation(remoteBranchData, localBranchData, "gitId");

  localFileTreeData = addLocation(
    remoteFileTreeData,
    localFileTreeData,
    "data.gitId"
  );

  return { localFileTreeData, localBranchData, localCommitTreeData };
};

const updateCommitIds = (localCommitTreeData, remoteCommitTreeData) => {
  const localIds = localCommitTreeData
    ? localCommitTreeData.map((value) => value.data.gitId)
    : [];
  const remoteIds = remoteCommitTreeData.map((value) => value.data.gitId);

  const ids = [...new Set([...localIds, ...remoteIds])];

  const idsMap = ids.reduce(
    (idsMap, id, index) => ({ ...idsMap, [id]: index + 1 }),
    {}
  );
  if (localCommitTreeData) {
    localCommitTreeData = localCommitTreeData.map((data) => ({
      ...data,
      number: idsMap[data.data.gitId],
    }));
  }

  remoteCommitTreeData = remoteCommitTreeData.map((data) => ({
    ...data,
    number: idsMap[data.data.gitId],
  }));

  return { localCommitTreeData, remoteCommitTreeData };
};

export {
  renderFileStructureVisualization,
  updateFileStructureVisualization,
  initializeGitVisualization,
  renderGitVisualization,
  updateGitVisualization,
  highlightNode,
  colors,
  delays,
  durations,
};
