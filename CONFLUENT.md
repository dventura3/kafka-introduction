## Install Confluent and Confluent Hub


1. Download the confluent tar.gz (or zip) in the official website:

Link: https://www.confluent.io/download/
Unzip the file

2. Install the confluent hub - it will be located in '/usr/local/bin/confluent-hub'

$ brew tap confluentinc/homebrew-confluent-hub-client
$ brew cask install confluent-hub-client
$ confluent-hub

3. How to install a confluent plugin/connector?

$ cd <confluent directory>
$ confluent-hub install <name of the connector>

<confluent directoy> is the folder where you download and unzip confluent. For example: <sth>/confluent-5.1.0


