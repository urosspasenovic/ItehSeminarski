import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { isStudent, Predmet, Prijava, Profesor, Seminarski, Student } from './model';
import Login from './components/Login';
import Loading from './components/Loading';
import axios from 'axios';
import { SERVER_URL } from './util';
import IspitiPage from './pages/SeminarskiPage';
import PredmetiPage from './pages/PredmetiPage';
import ObavezePage from './pages/ObavezePage';
import PredatePrijavePage from './pages/PredatePrijavePage';
import OceniPrijavePage from './pages/OceniPrijavePage';
import SeminarskiPage from './pages/SeminarskiPage';
import RandomSlika from './pages/RandomSlika';
axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState<Student | Profesor | undefined>(undefined);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    axios.get(SERVER_URL + '/check').then(res => {

      setUser(res.data);

    }).finally(() => {
      setFetching(false)
    })
  }, [])
  const onLogin = async (val: any) => {
    const data = (await axios.post(SERVER_URL + '/login', val)).data;
    setUser(data);
  }
  if (fetching) {
    return (
      <Loading />
    )
  }

  const prijavi = (data: Prijava) => {

    setUser((prev) => {
      if (isStudent(prev)) {
        return {
          ...prev, prijave: [
            ...prev.prijave, data
          ]
        }
      }
      return prev;

    })


  }
  const izmeniPrijavu = (data: Prijava) => {

    setUser((prev) => {
      if (isStudent(prev)) {
        return {
          ...prev, prijave: prev.prijave.map(element => {
            if (element.seminarski.id === data.seminarski.id) {
              return data;
            }
            return element;
          })
        }
      }
      return prev;

    })

  }
  const obrisiPrijavu = (semId: number) => {
    setUser((prev) => {
      if (isStudent(prev)) {
        return {
          ...prev, prijave: prev.prijave.filter(element => {
            return element.seminarski.id !== semId

          })
        }
      }
      return prev;

    })
  }

  const kreirajSeminarski = async (seminarski: Partial<Seminarski>, predmet: Predmet) => {
    const data = (await axios.post(SERVER_URL + '/seminarski', {
      ...seminarski,
      predmet: {
        id: predmet.id
      }
    })).data;
    setUser(prev => {
      if (!prev || isStudent(prev)) {
        return prev;
      }
      return {
        ...prev, predaje: prev.predaje.map(element => {
          if (element.id === predmet.id) {
            return {
              ...element, seminarski: [...element.seminarski, data]
            }
          } else {
            return element;
          }
        })
      }
    })
  }
  const izmeniSeminarski = async (seminarski: Partial<Seminarski>, predmet: Predmet) => {
    await axios.patch(SERVER_URL + '/seminarski/' + seminarski.id, {
      ...seminarski,
      predmet: {
        id: predmet.id
      }
    })
    setUser(prev => {
      if (!prev || isStudent(prev)) {
        console.log('student')
        return prev;
      }
      return {
        ...prev, predaje: prev.predaje.map(element => {
          if (element.id === predmet.id) {
            console.log('predmet')
            return {
              ...element, seminarski: element.seminarski.map(sem => {
                if (sem.id === seminarski.id) {
                  return { ...sem, ...seminarski }
                }
                return sem;
              })
            }
          } else {
            return element;
          }
        })
      }
    })
  }
  const obrisiSeminarski = async (sem: Seminarski) => {
    if (!user || isStudent(user)) {
      return;
    }
    await axios.delete(SERVER_URL + '/seminarski/' + sem.id);

    setUser((prev) => {
      if (!prev || isStudent(prev)) {
        return prev;
      }
      return {
        ...prev, predaje: prev.predaje.map(predmet => {
          return {
            ...predmet, seminarski: predmet.seminarski.filter(element => element !== sem)
          }
        })
      }
    })
  }

  const logout = () => {
    axios.post(SERVER_URL + '/logout').then(res => {
      setUser(undefined);
    })
  }
  return (
    <BrowserRouter>
      <Navbar logout={logout} user={user} />

      {
        user && isStudent(user) && (
          <Switch>

            <Route path='/obaveze'>
              <ObavezePage
                prijavi={prijavi}
                seminarski={user.slusa.flatMap(element => {
                  return element.seminarski.filter(sem => {
                    return user.prijave.find(prijava => prijava.seminarski.id === sem.id) === undefined
                  })
                })} />
            </Route>
            <Route path='/predato'>
              <PredatePrijavePage prijave={user.prijave} izmeniPrijavu={izmeniPrijavu} obrisiPrijavu={obrisiPrijavu} />
            </Route>
            <Route path='/slika'>
              <RandomSlika />
            </Route>
            <Route path='/'>
              <PredmetiPage predmeti={user.slusa} />
            </Route>
          </Switch>
        )
      }

      {
        user && !isStudent(user) && (
          <Switch>
            <Route path='/seminarski'>
              <SeminarskiPage profesor={user}
                kreirajSeminarski={kreirajSeminarski}
                izmeniSeminarski={izmeniSeminarski}
                obrisiSeminarski={obrisiSeminarski}
              />
            </Route>
            <Route path='/prijava'>
              <OceniPrijavePage profesor={user} />
            </Route>
            <Route path='/'>
              <PredmetiPage predmeti={user.predaje} />
            </Route>
          </Switch>
        )
      }
      {
        !user && (
          <Switch>
            <Route path='/'>
              <Login onSubmit={onLogin} />
            </Route>
          </Switch>
        )
      }

    </BrowserRouter>
  );
}

export default App;
