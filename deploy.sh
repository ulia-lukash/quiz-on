ls
pwd
dir_name=$(date +%Y-%m-%d_%H-%M-%S)
mv dist ${dir_name}
rm -rf /var/www/quizon_front/*
cp -r ${dir_name}/* /var/www/quizon_front/