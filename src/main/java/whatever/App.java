package whatever;

import org.httpobjects.jetty.HttpObjectsJettyHandler;
import org.httpobjects.proxy.Proxy;
import org.httpobjects.util.ClasspathResourceObject;
import org.httpobjects.util.ClasspathResourcesObject;

public class App {
	
	public static void main(String[] args) {
		HttpObjectsJettyHandler.launchServer(8080,
	        new ClasspathResourceObject("/", "/index.html", App.class),
	        new ClasspathResourcesObject("/{resource*}", App.class, "/"),
			new Proxy("http://votecastomatic.com", "http://localhost:8080"));
	}
}
