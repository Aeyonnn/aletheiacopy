<ContainerWhole>
    {/* Navbar */}
    <nav className='navbar' toggle={toggle}>
      <Link to='/' className='navbar-logo'> Aletheia </Link>
      <ul className='nav-items'>
        <li className='nav-item'>
          <a href='https://forms.gle/zmsf1yn5rwCYKXJm6' id='Survey'>Survey Here!</a>
        </li>
        <li className='nav-item'>
          <p>{user.attributes.email}</p>
        </li>
        <li className='nav-item'><a onClick={signOut}>Log Out</a></li>
      </ul>
    </nav>
    <Container>
        {/* <FormWrap>
            <FormContent>
              <FormLabel><h3>Test your news here!</h3></FormLabel>
              <FormLabel>Select Category</FormLabel>
               <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)} row>
                  <FormControlLabel value="TEXT" control={<Radio/>} label="Text"/>
                  <FormControlLabel value="URL" control={<Radio/>} label="URL"/>
               </RadioGroup>
                                  {(() => {
                    if (category === "URL") {
                      return (
                        <>
                        <div>You are using URL. Input your choice of URL here. 
                        </div>
                        <div>
                        <Formik
                        initialValues={{
                        newsSubmit: '',
                        }}
                        validationSchema={reviewSchemaURL}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
                        getText(values.newsSubmit)
                        fetchNewsArt(values.newsSubmit)
                        }}>  
                        {({isSubmitting,errors,touched,isValid,dirty}) => (
                        <Form>
                        <label htmlFor="newsSubmit"></label>
                          <Field className="newsSubmit" name="newsSubmit" placeholder="Enter URL Here" />
                          <button id="submit" type="submit" disabled={isSubmitting || !(dirty && isValid)} onClick={handleClick}> 
                          Submit
                          </button>
                          {
                            errors.newsSubmit && touched.newsSubmit && <p className='error' style={{color: "black"}}> {errors.newsSubmit} </p>
                          }
                        </Form>
                        )}
                      </Formik></div>
                      </>
                      )
                    } else if (category === "TEXT") {
                      return (
                        <>
                        <div> You are using Text. Input the headline or the body of the news.
                        </div>
                        <div>
                        <Formik
                        initialValues={{
                        newsSubmit: '',
                        }}
                        validationSchema={reviewSchemaText}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
                        getText(values.newsSubmit)

                        fetchNewsAlgo(values.newsSubmit);
                        
                        }}>  
                        {({isSubmitting,errors,touched,isValid,dirty}) => (
                        <Form>
                        <label htmlFor="newsSubmit"></label>
                          <Field className="newsSubmit" name="newsSubmit" placeholder="Enter Text Here" />
                          <button id="submit" type="submit" disabled={isSubmitting || !(dirty && isValid)} onClick={() => {handleClick()}}> 
                          Submit
                          </button>
                          {
                            errors.newsSubmit && touched.newsSubmit && <p className='error' style={{color: "black"}}> {errors.newsSubmit} </p>
                          }
                        </Form>
                        )}
                      </Formik></div>
                      </>
                      )
                    }
                    })()}
          </FormContent>
        </FormWrap> */}
    </Container>
  <Container>
    <FormWrap>
      {/* <FormLoader>
        {//shows loading screen
        loading ? (<Loading/>) : ("") }
      </FormLoader> */}
      <ContentTable>
        {//shows table
        showtable
         ? (      
           
                  <div className="table-wrapper">
                    <div>{outcome ? (<h1>The news is {combination}</h1>) : ("")}</div>
                  <table class="fl-table">
                      <thead>
                      <tr>
                          <th>Model</th>
                          <th>Result</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td><div data-tooltip='This is the combination of the three algorithms and is the product of the study. Using Ensemble voting classifier, we combined the three algorithms to provide which of the algorithms will be best suited when working together for the dataset that we built. 'className='tooltip'>Combination</div></td>
                          <td><b>{combination}</b></td>
                      </tr>
                      <tr>
                        <td colSpan={2}><b>Algorithms</b></td>
                      </tr>
                      <tr>
                          <td><div data-tooltip='A decision tree is a type of supervised machine learning that categorizes or predicts outcomes based on the answers to prior questions. The model is supervised learning, which means it is trained and tested on a set of data containing the intended categorization.'className='tooltip'>Decision Tree</div></td>
                          <td><b>{decision}</b></td>
                      </tr>
                      <tr>
                          <td><div data-tooltip='The type of Neural Network used in this study is an MLP (Multilayer Perceptron). An MLP creates outputs from a set of inputs. The input is distributed in multiple layers that are linked to the data and the output'className='tooltip'>Neural Network</div></td>
                          <td><b>{neural}</b></td>
                      </tr>
                      <tr>
                          <td><div data-tooltip='A random forest is a decision tree that is bundled up together. In this case multiple decision tree exist to create output based on the data and input.'className='tooltip'>Random Forest</div></td>
                          <td><b>{randomf}</b></td>
                      </tr>
                      </tbody>
                  </table>
                    {fdbutton ? (<div style={{backgroundColor: '#EDEDED', display: 'flex', justifyContent: 'center',marginTop:10}}>
                    <p id='paragraph'>Is the prediction correct?</p>
                    <div id='yesbutton'>
                    <button id="submittable" type="submit" disabled={disable}  onClick={() => {feedbackVariable('YES'); refreshclick(); setfdbutton(false)}}> 
                          Yes
                          </button>
                          </div>
                    <div id='nobutton'>
                          <button id="submittable" type="submit" disabled={disable} onClick={() => {feedbackVariable('NO'); refreshclick(); setfdbutton(false)}}> 
                          No
                          </button>
                          </div>
                  </div>) : 
                  (<div style={{backgroundColor: '#EDEDED', display: 'flex', justifyContent: 'center',marginTop:10}}><h3>Thank you for answering our feedback!</h3></div>
                  )}
                  <p className='hovertip'>*hover over the algorithms and combination to know about them</p>
              </div>) : 
              (<div>{errortable ? (<h3>It looks like there is an error in extracting the text from the website. Try using the text method instead.</h3>) : ("")} </div>)}
        </ContentTable>
        </FormWrap>
        </Container>
        <Container>
        <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
        {/* <Button id="history" onClick={historyClick} disabled={dbutton || submitting} >History</Button> */}
        </div>
        <ContentTableHistory>
        {
          enable ? (
        <div class="table-wrapperbench">
          <table class='tl-table'>
          <thead>
            <tr>
              <th>News Body</th>
              <th>News Prediction</th>
              <th>User Evaluation</th>
              <th>Checked</th>
              <th>Date Submitted</th>
              <th>Date Checked</th>
            </tr>
            
          </thead>
          <tbody>
          {user_hist.slice(0, user_hist.length).map((item,index) => {
            if (item[6] === null){
              item[6] = "To be evaluated"
            }
            return (
              <tr>
                <td>{item[3]}</td>
                <td>{item[4]}</td>
                <td>{item[5]}</td>
                <td>{item[6]}</td>
                <td>{item[7]}</td>
                <td>{item[8]}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        </div>
        ) : ("")
        }
        </ContentTableHistory>
    </Container>
</ContainerWhole>