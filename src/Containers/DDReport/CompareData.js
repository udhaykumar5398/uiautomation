import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AreaHighlight, PdfHighlighter, PdfLoader, Popup, Tip, Highlight } from 'react-pdf-highlighter';
import Spinner from './Spinner';
import { updatedata } from '../../Store/ProcessorDashboard/ProcessorDashboardAction';
import PdfHighlighting from './PdfHighlighting'

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => {
  const hash = document.location.hash;
  console.log("Current Hash:", hash);
  return hash.slice("#highlight-".length);
};

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({ content, comment }) => {
  let lmsLoanText = Object.values(content?.lmsloan)[0];
  return lmsLoanText ? (
    <div className="Highlight__popup">{lmsLoanText}</div>
  ) : null;
};

const CompareData = (props) => {
  const dispatch = useDispatch();
  const url = JSON.parse(useSelector((state) => state.processordashboard.review));
  const url1 = url.loandocpath;
  const [loading, setLoading] = useState(false);
  const [msgData, setMsgData] = useState(null);
  const [poolid, setPoolid] = useState(localStorage.getItem('poolid'));
  const [poolname, setPoolName] = useState(localStorage.getItem('poolname'));
  const [highlights, setHighlights] = useState(url[url.loandocpath] ? [...url[url?.loandocpath]] : []);

  // Use ref for scrollViewerTo to persist the value across renders
  const scrollViewerToRef = useRef(null);

  const resetHighlights = () => {
    setHighlights([]);
  };

  const scrollToHighlightFromHash = () => {
    const highlightId = parseIdFromHash();
    console.log("Parsed ID:", highlightId);
    const highlight = getHighlightById(highlightId);
    if (highlight && scrollViewerToRef.current) {
      scrollViewerToRef.current(highlight);
    }
  };

  const getHighlightById = (id) => {
    const result = highlights.find((highlight) => {
      return String(highlight.id) === String(id);
    });
    console.log("Found Highlight:", result);
    return result;
  };

  const addHighlight = (highlight) => {
    console.log("Saving highlight", highlight);

    highlight.content = {
      lmsloan: { Key: highlight.content.text },
      agreementloan: { Key: highlight.content.text },
    };
    const newHighlight = { ...highlight, id: getNextId() };
    setHighlights([newHighlight, ...highlights]);
  };

  const updateHighlight = (highlightId, position, content) => {
    console.log("Updating highlight", highlightId, position, content);

    setHighlights((prevHighlights) =>
      prevHighlights.map((h) => {
        const { id, position: originalPosition, content: originalContent, ...rest } = h;

        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      })
    );
  };

  useEffect(() => {
    console.log("Adding hashchange listener");
    window.addEventListener("hashchange", scrollToHighlightFromHash);
    return () => {
      console.log("Removing hashchange listener");
      window.removeEventListener("hashchange", scrollToHighlightFromHash);
    };
  }, [highlights]);

  // Call scrollToHighlightFromHash when scrollViewerTo is set
  useEffect(() => {
    if (scrollViewerToRef.current) {
      scrollToHighlightFromHash();
    }
  }, [scrollViewerToRef.current]);

  const SaveData = async () => {
    let newArr = [];
    for (let i = 0; i < highlights.length; i++) {
      newArr.push(highlights[i].content.lmsloan);
    }
    const obj = Object.assign({}, ...newArr);
    let newArr1 = [];
    for (let i = 0; i < highlights.length; i++) {
      newArr1.push(highlights[i].content.agreementloan);
    }
    const obj1 = Object.assign({}, ...newArr1);
    let data = {
      lmsloan: obj,
      agreementloan: obj1,
      poolid: poolid,
    };

    await dispatch(updatedata(data));
    props.action({ reload: true, close: true });
  };

  return (
    <div>
      {url !== undefined ? (
        <div id="comparesave">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ background: '#048c88' }}
            onClick={SaveData}
          >
            Save
          </Button>
        </div>
      ) : (
        ''
      )}

      {url !== undefined ? (
        <div className="matchscroll">
          <div style={{ display: 'flex', height: '100vh' }}>
            <PdfHighlighting highlights={highlights} resetHighlights={resetHighlights} />
            <div
              style={{
                height: '100vh',
                width: '75vw',
                position: 'relative',
              }}
            >
              <PdfLoader
                url={'https://intainva.intainabs.com/' + '/root_folder/uploads/' + url1}
                beforeLoad={<Spinner />}
              >
                {(pdfDocument) => (
                  <PdfHighlighter
                    pdfDocument={pdfDocument}
                    enableAreaSelection={(event) => event.altKey}
                    onScrollChange={resetHash}
                    scrollRef={(scrollTo) => {
                      scrollViewerToRef.current = scrollTo;
                      scrollToHighlightFromHash();
                    }}
                    onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => (
                      <Tip
                        onOpen={transformSelection}
                        onConfirm={(comment) => {
                          addHighlight({ content, position, comment });
                          hideTipAndSelection();
                        }}
                      />
                    )}
                    highlightTransform={(
                      highlight,
                      index,
                      setTip,
                      hideTip,
                      viewportToScaled,
                      screenshot,
                      isScrolledTo
                    ) => {
                      const isTextHighlight = !Boolean(highlight.content && highlight.content.image);
                      const component = isTextHighlight ? (
                        <Highlight
                          isScrolledTo={isScrolledTo}
                          position={highlight.position}
                          comment={highlight.comment}
                        />
                      ) : (
                        <AreaHighlight
                          highlight={highlight}
                          onChange={(boundingRect) => {
                            updateHighlight(
                              highlight.id,
                              { boundingRect: viewportToScaled(boundingRect) },
                              { image: screenshot(boundingRect) }
                            );
                          }}
                        />
                      );
                      return (
                        <Popup
                          popupContent={<HighlightPopup {...highlight} />}
                          onMouseOver={(popupContent) =>
                            setTip(highlight, (highlight) => popupContent)
                          }
                          onMouseOut={hideTip}
                          key={index}
                          children={component}
                        />
                      );
                    }}
                    highlights={highlights}
                  />
                )}
              </PdfLoader>
            </div>
          </div>
        </div>
      ) : (
        <h6>Loan file is not available</h6>
      )}
    </div>
  );
};

export default CompareData;
