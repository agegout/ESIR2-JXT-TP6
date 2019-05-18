# ESIR JXT TP6
## Moisan Simon
## Gégout Adrien

Rendu du TP6 de JXT

## Code coverage faible pour controllers/alerts.js, models/alerts.js et model/db-connec.js

Le code coverage est faible pour ces 3 fichiers uniquement à cause de la gestion des erreurs de connection à la base de donnée (en preuve, les lignes non-couvertes rendu par __npm run test-report__). En effet, il aurait fallu rajouter une librairie permettant de modifier des fichiers (__fs__) (pour modifier le fichier de configuration par default) pour pouvoir tester correctement ces lignes.


