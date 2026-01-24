## To build the project: (run from root)
```
cd api/sqlite_ext
gcc -fPIC -shared -o spellfix.so spellfix.c
cd ../ 
npm ci
cd ../web
npm ci && npm run build
```

## To run: (run from root)
```
cd api
node .
```
