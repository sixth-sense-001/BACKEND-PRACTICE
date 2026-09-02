import students from '../data/data.js';

export default function paginationMiddleware(req, res, next) {
  console.log(students.length);
  let page = req.query.page;
  let limit = req.query.limit;
  let sortCriteria = req.query.sort;
  if ((page !== undefined) && (limit !== undefined)) {
    console.log('line 8');
    page = Number(page);
    limit = Number(limit);

    if ((!Number.isNaN(page)) && (!Number.isNaN(limit)) && (sortCriteria !== undefined)) {
      const lowerPage = Math.floor(page);
      const lowerLimit = Math.floor(limit);

      if (((page - lowerPage) === 0) && ((limit - lowerLimit) === 0)) {
        if ((page > 0) && (limit > 0)) {
          const startIndex = (page - 1) * limit;
          let endIndex = startIndex + limit - 1;

          if (sortCriteria === 'name') {
            if (startIndex >= students.length) {
              console.log('line 21');
              return res.status(404).json({ message: `Sorry, page ${page} is blank` });
            } else {
              console.log('line 24');
              const pageElements = [];
              if (endIndex >= students.length) {
                console.log('line 27');
                for (let i = startIndex; i < students.length; i++) {
                  pageElements.push(students[i]);
                }
                pageElements.sort((a, b) => a.name.localeCompare(b.name));
                return res.status(200).json({ pageElements });
              } else {
                console.log('line 33');
                console.log(startIndex, endIndex);
                for (let i = startIndex; i <= endIndex; i++) {
                  pageElements.push(students[i]);
                }
                pageElements.sort((a, b) => a.name.localeCompare(b.name));
                return res.status(200).json({ pageElements });
              }
            }
          } else if (sortCriteria === 'age') {
            if (startIndex >= students.length) {
              console.log('line 21');
              return res.status(404).json({ message: `Sorry, page ${page} is blank` });
            } else {
              console.log('line 24');
              const pageElements = [];
              if (endIndex >= students.length) {
                console.log('line 27');
                for (let i = startIndex; i < students.length; i++) {
                  pageElements.push(students[i]);
                }
                pageElements.sort((a, b) => a.age - b.age);
                return res.status(200).json({ pageElements });
              } else {
                console.log('line 33');
                console.log(startIndex, endIndex);
                for (let i = startIndex; i <= endIndex; i++) {
                  pageElements.push(students[i]);
                }
                pageElements.sort((a, b) => a.age - b.age);
                return res.status(200).json({ pageElements });
              }
            }
          } else {
            return res.status(400).json({ message: "400 Bad request" });
          }
        } else {
          return res.status(400).json({ message: "400 Bad request" });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({ message: "400 Bad request" });
    }
  } else if ((limit !== undefined) && (page !== undefined) && (sortCriteria === undefined)) {
    if (startIndex >= students.length) {
      console.log('line 21');
      return res.status(404).json({ message: `Sorry, page ${page} is blank` });
    } else {
      console.log('line 24');
      const pageElements = [];
      if (endIndex >= students.length) {
        console.log('line 27');
        for (let i = startIndex; i < students.length; i++) {
          pageElements.push(students[i]);
        }
        return res.status(200).json({ pageElements });
      } else {
        console.log('line 33');
        console.log(startIndex, endIndex);
        for (let i = startIndex; i <= endIndex; i++) {
          pageElements.push(students[i]);
        }
        return res.status(200).json({ pageElements });
      }
    }
  } else if ((limit !== undefined) && (page === undefined) && (sortCriteria === undefined)) {
    console.log('line 36');
    const pageElements = [];
    limit = Number(limit);

    if (!Number.isNaN(limit)) {
      const lowerLimit = Math.floor(limit);

      if (limit - lowerLimit === 0) {
        console.log('line 56');
        if (limit > 0) {
          console.log('line 58');
          if (limit >= students.length) {
            console.log('line 60');
            for (let i = 0; i < students.length; i++) {
              pageElements.push(students[i]);
            }
            return res.status(200).json(pageElements);
          } else {
            console.log('line 66');
            for (let i = 0; i < limit; i++) {
              pageElements.push(students[i]);
            }
            return res.status(200).json(pageElements);
          }
        } else {
          return res.status(400).json({ message: "400 Bad request" });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({ message: "400 Bad request" });
    }
  } else if ((limit !== undefined) && (page === undefined) && (sortCriteria !== undefined)) {

    console.log('line 36');
    const pageElements = [];
    limit = Number(limit);

    if (!Number.isNaN(limit)) {
      const lowerLimit = Math.floor(limit);

      if (limit - lowerLimit === 0) {
        console.log('line 56');
        if (limit > 0) {
          console.log('line 58');
          if (sortCriteria === 'name') {
            if (limit >= students.length) {
              console.log('line 60');
              for (let i = 0; i < students.length; i++) {
                pageElements.push(students[i]);
              }
              pageElements.sort((a, b) => a.name.localeCompare(b.name));
              return res.status(200).json(pageElements);
            } else {
              console.log('line 66');
              for (let i = 0; i < limit; i++) {
                pageElements.push(students[i]);
              }
              pageElements.sort((a, b) => a.name.localeCompare(b.name));
              return res.status(200).json(pageElements);
            }
          } else if (sortCriteria === 'age') {
            if (limit >= students.length) {
              console.log('line 60');
              for (let i = 0; i < students.length; i++) {
                pageElements.push(students[i]);
              }
              pageElements.sort((a, b) => a.age - b.age);
              return res.status(200).json(pageElements);
            } else {
              console.log('line 66');
              for (let i = 0; i < limit; i++) {
                pageElements.push(students[i]);
              }
              pageElements.sort((a, b) => a.age - b.age);
              return res.status(200).json(pageElements);
            }
          } else {
            return res.status(400).json({ message: "400 Bad request" });
          }
        } else {
          return res.status(400).json({ message: "400 Bad request" });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({ message: "400 Bad request" });
    }
  }
  else if ((limit === undefined) && (page !== undefined) && (sortCriteria === undefined)) {
    page = Number(page);
    if (!Number.isNaN(page)) {
      const lowerPage = Math.floor(page);

      if (page - lowerPage === 0) {
        if (page === 1) {
          return res.status(200).json(students);
        } else if (page > 1) {
          return res.status(404).json({ message: `Page ${page} is blank` });
        } else {
          return res.status(400).json({ message: "400 Bad request." });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({ message: "400 Bad request" });
    }
  } else if ((limit === undefined) && (page !== undefined) && (sortCriteria !== undefined)) {
    page = Number(page);
    if (!Number.isNaN(page)) {
      const lowerPage = Math.floor(page);

      if (page - lowerPage === 0) {
        if (page === 1) {
          const pageElements = students.slice();
          if (sortCriteria === 'name') {
            pageElements.sort((a, b) => a.name.localeCompare(b.name));
            return res.status(200).json(pageElements);
          } else if (sortCriteria === 'age') {
            pageElements.sort((a, b) => a.age - b.age);
            return res.status(200).json(pageElements);
          } else {
            return res.status(400).json({ message: "400 Bad request" });
          }
        } else if (page > 1) {
          return res.status(404).json({ message: `Page ${page} is blank` });
        } else {
          return res.status(400).json({ message: "400 Bad request." });
        }
      } else {
        return res.status(400).json({ message: "400 Bad request" });
      }
    } else {
      return res.status(400).json({ message: "400 Bad request" });
    }

  }
  else {
    next();
  }
}