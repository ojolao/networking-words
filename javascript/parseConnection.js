const parseConnection = (words) => {
  const wordCol = words.split(' ');
  const chars = {};
  wordCol.forEach((word, i) => {
    graph.addNode(word, { text: word, type: 'whole word' });
    const wordArray = word.split('');
    wordArray.forEach((char) => {
      if (!chars[char]) {
        const newNodeId = char + 'count1';
        chars[char] = { count: 1, count1: {} };
        graph.addNode(newNodeId, { text: char, type: 'letter' });
        chars[char].count1[word] = true;
        graph.addLink(newNodeId, word);
      } else {
        const addLetters = () => {
          chars[char].count++;
          const charCountStr = 'count' + chars[char].count;
          const nodeId = char + charCountStr;
          chars[char][charCountStr] = {};
          chars[char][charCountStr][word] = true;
          graph.addNode(nodeId, { text: char, type: 'letter' });
          graph.addLink(nodeId, word);
        };
        if (i === 0) {
          addLetters();
        } else {
          let start = 1;
          let inserted = false;
          while (start <= chars[char].count) {
            const currentCount = 'count' + start;
            if (!chars[char][currentCount][word]) {
              const curNodeId = char + currentCount;
              chars[char][currentCount][word] = true;
              graph.addLink(curNodeId, word);
              inserted = true;
              break;
            } else {
              start++;
            }
          }
          if (!inserted) {
            addLetters();
          }
        }
      }
    });
  });
  return;
}